<script setup lang="ts">
    import { useGameParametersStore } from '../stores/GameParametersStore';
    import { Icon } from '@iconify/vue';
    import i18n from '../modules/i18n';
    import locales from '../locales/locale.json';
</script>

<template>
    <div class="locale-changer">
        <Icon :icon="getIconForLocale(localeChoice)" class="locale-icon"/>
        <select v-model="localeChoice" @change="changeLanguage">
            <option v-for="locale in locales" :key="`locale-${locale.lang}`" :value="locale.lang">
                {{ locale.lang.toLocaleUpperCase() }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
export default {
    name: 'LanguageSelector',
    data() {
        return {
            locales: locales,
            localeChoice: i18n.global.locale.value,
        };
    },
    methods: {
        changeLanguage() {
            console.log(i18n.global.locale);
            useGameParametersStore().setLanguage(this.localeChoice);
        },
        getIconForLocale(locale: string) {
            return locales.find((l) => l.lang === locale)?.icon;
        },
    },
};
</script>
