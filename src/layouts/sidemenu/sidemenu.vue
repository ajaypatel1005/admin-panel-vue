<template>
  <!-- Start::Appbar -->
  <v-app-bar color="primary">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>To-Do List</v-app-bar-title>

    <!--Begin::Profile three dot -->
    <v-menu transition="slide-y-reverse-transition">
      <template v-slot:activator="{ props }">
        <v-avatar v-bind="props" class="me-2">
          <v-img
            style="cursor: pointer"
            :src="store.userDetail.profile_image"
            alt="John"
          ></v-img>
        </v-avatar>
      </template>

      <v-list :lines="false">
        <v-list-item link>
          <v-list-item-title>{{ store.userDetail.name }}</v-list-item-title>
          <v-list-item-title class="text-grey">{{
            store.userDetail.email
          }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item
          v-for="(item, i) in profile_items"
          :key="i"
          :value="item"
          color="primary"
          :to="item.links"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon" small></v-icon>
          </template>
          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
        <v-list-item
          :prepend-icon="darkMode ? 'mdi-brightness-4' : 'mdi-brightness-6'"
          @click.stop="toggleDarkMode()"
          :title="darkMode ? 'Light Theme' : 'Dark Theme'"
        ></v-list-item>
        <v-divider></v-divider>
        <v-list-item
          prepend-icon="mdi-power"
          @click.stop="store.logout()"
          title="Logout"
        ></v-list-item>
      </v-list>
    </v-menu>
    <!-- End::Profile Three Dot -->
  </v-app-bar>

  <!-- End::Appbar -->

  <!-- Start:: Drawer -->
  <v-navigation-drawer permanent v-model="drawer">
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        :prepend-avatar="store.userDetail.profile_image"
        :title="store.userDetail.name"
        :subtitle="store.userDetail.email"
      ></v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list>
      <template v-for="(item, i) in store.menuList">
        <v-list-item v-if="item.url" :key="i" :to="item.url" color="primary">
          <template v-slot:prepend>
            <i class="fas mr-3" :class="item.icon"></i>
          </template>
          <v-list-item-title class="text-wrap">{{
            item.name
          }}</v-list-item-title>
        </v-list-item>

        <!-- <v-list-group
          v-if="item.child.length > 0"
          :key="i"
          :append-icon="item.menu_link ? 'add' : ''"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              class="font-weight-regular"
              color="primary"
            >
              <template v-slot:prepend>
                <i class="fas mr-3" :class="item.menu_icon"></i>
              </template>
              <v-list-item-title class="text-wrap">{{
                item.name
              }}</v-list-item-title>
            </v-list-item>
          </template>
          <v-list-item
            color="primary"
            v-for="childs in item.child"
            :key="childs.menu_link"
            :value="childs.name"
            :to="childs.menu_link"
          >
            <template v-slot:prepend>
              <i class="fas mr-3" :class="childs.menu_icon"></i>
            </template>
            <v-list-item-title class="text-wrap">{{
              childs.name
            }}</v-list-item-title>
          </v-list-item>
        </v-list-group> -->
      </template>
    </v-list>
  </v-navigation-drawer>

  <!-- End::Drawer -->
</template>

<script src="./sidemenu.ts"></script>