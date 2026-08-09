<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LegalLayout from '@/components/LegalLayout.vue'

const { t, tm } = useI18n()
const sections = computed(() => tm('terms_page.sections'))
</script>

<template>
  <LegalLayout
    :label="t('terms_page.label')"
    :title="t('terms_page.title')"
    :description="t('terms_page.description')"
    :updated="t('terms_page.updated')"
  >
    <section v-for="(section, index) in sections" :key="index">
      <h2>{{ section.heading }}</h2>
      <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">{{ paragraph }}</p>
      <ul v-if="section.list?.length">
        <li v-for="(item, lIndex) in section.list" :key="lIndex">{{ item }}</li>
      </ul>
    </section>
  </LegalLayout>
</template>
