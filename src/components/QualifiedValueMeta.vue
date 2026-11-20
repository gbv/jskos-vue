<script setup>
import { inject } from "vue"
import { useQualifiedStatementsLocale } from "../locales/qualifiedStatements.js"
import { uriResolutionKey } from "../composables/useUriResolution.js"

defineProps({
  value: { type: Object, required: true },
})

const resolution = inject(uriResolutionKey)
const { t } = useQualifiedStatementsLocale()
</script>

<template>
  <small
    v-if="value.startDate || value.endDate"
    class="jskos-vue-qualifiedStatements-range">
    {{ resolution.fmtRange(value.startDate, value.endDate) }}
  </small>
  <small
    v-if="value.rank === 'preferred' || value.rank === 'deprecated'"
    class="jskos-vue-qualifiedStatements-rank">
    {{ t(value.rank) }}
  </small>
</template>
