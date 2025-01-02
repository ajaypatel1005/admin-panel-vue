<template>
  <v-container fluid="">
    <sidemenu v-on:isThemeChange="changeTheme($event)"/>
    <h3>{{ route.meta.page_title }}</h3>
    <v-breadcrumbs :items="route.meta.breadcrumb" density="compact">
      <template v-slot:title="{ item }">
        {{ item.title }}
      </template>
    </v-breadcrumbs>
    <v-card class="mx-auto pa-2" min-height="500">
      <router-view ></router-view>

      <v-overlay
        v-model="store.isLoaderShowList"
        contained
        persistent
        style="z-index: 2;"
        class="align-center justify-center"
      >
        <v-progress-circular :size="50" indeterminate class="primary--text" />
      </v-overlay>
    </v-card>
  </v-container>
</template>

<script src="./admin-layout.ts"></script>