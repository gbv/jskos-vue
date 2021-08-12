<template>
  <div
    ref="spacer"
    :class="{
      'jskos-vue-grid-spacer': true,
      'jskos-vue-grid-spacer-horizontal': horizontal,
      'jskos-vue-grid-spacer-vertical': !horizontal,
      'jskos-vue-grid-spacer-resizable': resizable,
    }"
    draggable="false"
    @mousedown="startResizing" />
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue"

defineProps({
  resizable: {
    type: Boolean,
    default: true,
  },
})

const spacer = ref()
const horizontal = computed(() => {
  const parent = spacer.value && spacer.value.parentElement
  if (!parent) {
    return false
  }
  return !parent.classList.contains("jskos-vue-grid-row")
})
const isValidSibling = (element) => {
  for (let className of ["jskos-vue-grid-element", "jskos-vue-grid-row", "jskos-vue-grid-column"]) {
    if (element.classList && element.classList.contains(className)) {
      return true
    }
  }
  return false
}
const getSiblings = () => {
  if (!spacer.value) {
    return {
      previous: null,
      next: null,
    }
  } else {
    const isVisible = (element) => {
      return window.getComputedStyle(element).display !== "none"
    }
    let previous = spacer.value.previousElementSibling
    // Look for the closest grid element
    while (previous && (!isVisible(previous) || !isValidSibling(previous))) {
      previous = previous.previousElementSibling
    }
    let next = spacer.value.nextElementSibling
    // Look for the closest grid element
    while (next && (!isVisible(next) || !isValidSibling(next))) {
      next = next.nextElementSibling
    }
    return {
      previous,
      next,
    }
  }
}

const flex = ref({})
const savedValues = {}

const refreshFlex = () => {
  for (let sibling of Object.values(getSiblings())) {
    if (!sibling || !sibling.id) {
      continue
    }
    if (flex.value[sibling.id] != null) {
      sibling.style.flex = flex.value[sibling.id]
    }
  }
}
watch(flex, () => {
  refreshFlex()
})
const saveFlex = (element) => {
  if (element && element.id && element.style) {
    flex.value[element.id] = element.style.flex
  }
}

let endResizing
const startResizing = (event) => {
  const { previous, next } = getSiblings()
  // If either previous or next doesn't exist
  if (!previous || !next) {
    return
  }
  let
    previousWidth = previous.clientWidth,
    nextWidth = next.clientWidth,
    previousHeight = previous.clientHeight,
    nextHeight = next.clientHeight,
    totalWidth = previousWidth + nextWidth,
    totalHeight = previousHeight + nextHeight,
    previousStyle = window.getComputedStyle(previous),
    nextStyle = window.getComputedStyle(next),
    totalFlex = parseFloat(previousStyle.getPropertyValue("flex-grow")) + parseFloat(nextStyle.getPropertyValue("flex-grow"))
    // previousMinWidth = parseInt(previousStyle.getPropertyValue("min-width")),
    // nextMinWidth = parseInt(nextStyle.getPropertyValue("min-width")),
    // previousMinHeight = parseInt(previousStyle.getPropertyValue("min-height")),
    // nextMinHeight = parseInt(nextStyle.getPropertyValue("min-height"))

  savedValues.previousWidth = previousWidth
  savedValues.nextWidth = nextWidth
  savedValues.previousHeight = previousHeight
  savedValues.nextHeight = nextHeight

  // Prepare end of resizing
  if (endResizing) {
    endResizing()
  }
  endResizing = () => {
    document.removeEventListener("mousemove", onMouseMove)
    document.onmouseup = null
    document.body.style.cursor = "auto"
    document.body.style.userSelect = "auto"
    endResizing = null
  }
  let start = !horizontal.value ? event.clientX : event.clientY
  document.body.style.cursor = !horizontal.value ? "col-resize" : "row-resize"
  document.body.style.userSelect = "none"

  function onMouseMove(event) {
    let moved = (!horizontal.value ? event.clientX : event.clientY) - start
    if (!horizontal.value) {
      let newPreviousWidth = previousWidth + moved
      let newNextWidth = nextWidth - moved
      // if (newPreviousWidth < previousMinWidth || newNextWidth < nextMinWidth  || previousMinimized + nextMinimized == 1) {
      //   // Minimize/maximize previous/next component when resize is committed all the way.
      //   if (newPreviousWidth <= 10 || newNextWidth <= 10 || newPreviousWidth >= previousMinWidth * 3 && previousMinimized == 1 || newNextWidth >= nextMinWidth * 3 && nextMinimized == 1) {
      //     // Get minimizer component
      //     let element = newPreviousWidth <= 10 || previousMinimized == 1 ? previous : next
      //     let minimizerElement = element.getElementsByClassName("minimizer")[0]
      //     // Only continue if minimizerElement is one or two elements deep.
      //     if (minimizerElement.parentElement != element && minimizerElement.parentElement.parentElement != element) {
      //       return
      //     }
      //     let minimizerComponent = minimizerElement.__vue__
      //     if (minimizerComponent) {
      //       // Restore saved values
      //       previous.style.flex = vm.savedValues.previousWidth / totalWidth * totalFlex
      //       vm.saveFlex(previous)
      //       next.style.flex = vm.savedValues.nextWidth / totalWidth * totalFlex
      //       vm.saveFlex(next)
      //       // Minimize/maximize
      //       minimizerComponent.toggleMinimize()
      //       // End resizing
      //       endResizing()
      //     }
      //   }
      //   return
      // }
      if (newPreviousWidth < 0 || newNextWidth < 0) {
        return
      }
      previous.style.flex = newPreviousWidth / totalWidth * totalFlex
      saveFlex(previous)
      next.style.flex = newNextWidth / totalWidth * totalFlex
      saveFlex(next)
    } else {
      let newPreviousHeight = previousHeight + moved
      let newNextHeight = nextHeight - moved
      // if (newPreviousHeight < previousMinHeight || newNextHeight < nextMinHeight || previousMinimized + nextMinimized == 1) {
      //   // Minimize/maximize previous/next component when resize is committed all the way.
      //   if (newPreviousHeight <= 10 || newNextHeight <= 10 || newPreviousHeight >= previousMinHeight * 3 && previousMinimized == 1 || newNextHeight >= nextMinHeight * 3 && nextMinimized == 1) {
      //     // Get minimizer component
      //     let element = newPreviousHeight <= 10 || previousMinimized == 1 ? previous : next
      //     let minimizerElement = element.getElementsByClassName("minimizer")[0]
      //     // Only continue if minimizerElement is one or two elements deep.
      //     if (minimizerElement.parentElement != element && minimizerElement.parentElement.parentElement != element) {
      //       return
      //     }
      //     let minimizerComponent = minimizerElement.__vue__
      //     if (minimizerComponent) {
      //       // Restore saved values
      //       previous.style.flex = vm.savedValues.previousHeight / totalHeight * totalFlex
      //       vm.saveFlex(previous)
      //       next.style.flex = vm.savedValues.nextHeight / totalHeight * totalFlex
      //       vm.saveFlex(next)
      //       // Minimize/maximize
      //       minimizerComponent.toggleMinimize()
      //       // End resizing
      //       endResizing()
      //     }
      //   }
      //   return
      // }
      if (newPreviousHeight < 0 || newNextHeight < 0) {
        return
      }
      previous.style.flex = newPreviousHeight / totalHeight * totalFlex
      saveFlex(previous)
      next.style.flex = newNextHeight / totalHeight * totalFlex
      saveFlex(next)
    }
  }
  document.addEventListener("mousemove", onMouseMove)
  document.onmouseup = endResizing
}

onMounted(() => {
  refreshFlex()
})
</script>

<style>
.jskos-vue-grid-spacer {
  flex: 0 1 4px;
}
.jskos-vue-grid-spacer-horizontal.jskos-vue-grid-spacer-resizable {
  cursor: row-resize;
}
.jskos-vue-grid-spacer-vertical.jskos-vue-grid-spacer-resizable {
  cursor: col-resize;
}
</style>
