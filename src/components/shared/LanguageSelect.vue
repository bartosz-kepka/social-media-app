<template>
  <v-select
      v-model="language"
      :items="languages"
      :label="$t('navigation.language')"
      append-icon="mdi-translate"
      dense
      hide-details
      outlined
  />
</template>

<script>
export default {
  name: 'LanguageSelect',
  data() {
    return {
      languages: [
        {
          text: 'English',
          value: 'en',
        },
        {
          text: 'Polski',
          value: 'pl',
        },
      ],
    };
  },
  computed: {
    language: {
      get() {
        return this.$i18n.locale;
      },
      set(newLanguage) {
        this.$store.dispatch('settings/setLanguage', newLanguage);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
