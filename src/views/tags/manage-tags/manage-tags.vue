<template>
  <v-row>
    <v-col cols="12" sm="3">
      <v-text-field
        v-model="searchText"
        density="compact"
        variant="outlined"
        label="Search..."
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @keydown.enter.prevent="handlePageChange"
      ></v-text-field>
    </v-col>
    <!-- end search bar -->
    <v-col cols="12" sm="9">
      <div class="d-flex flex-row-reverse">
        <v-btn
          color="primary"
          variant="outlined"
          prepend-icon="mdi-plus"
          @click="editCreateUserType('')"
          title="Add"
         
          >Add</v-btn
        >
        <v-btn
          class="me-2"
          color="error"
          variant="outlined"
          prepend-icon="mdi-delete"
          v-if="selectedData.length > 0 "
          @click="deleteAll()"
          title="Delete All"
          >Delete All</v-btn
        >
      </div>
    </v-col>
  </v-row>

  <!-- Roles List Start -->
  <v-data-table
    v-model="selectedData"
    v-model:items-per-page="store.per_page"
    :headers="headers"
    :items="tagsList"
    :search="searchText"
    show-select
    class="mt-4"
    hide-default-footer
    density="compact"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        size="small"
        color="success"
        class="me-2"
        @click="editCreateUserType(item.raw.id)"
        title="Edit"
        
      >
        mdi-pencil
      </v-icon>
      
      <v-icon
        size="small"
        color="red"
        @click="deleteUserType(item.raw.id)"
        title="Delete"
      >
        mdi-delete
      </v-icon>
    </template>
   
    <template v-slot:bottom>
      <!-- Begin::Pagination and Items per Page -->
      <v-row class="justify-space-between mt-2">
        <!-- Items per Page Select -->
        <v-col cols="auto">
          <v-select
            v-model="store.per_page"
            :items="[10, 15, 20, 25, 30, 50, 100]"
            label="Per page"
            class="mb-4"
            density="compact"
            variant="outlined"
             @update:modelValue="handlePageChange()"
            outlined
            style="width: 100px;"
          ></v-select>

        </v-col>

        <!-- Pagination -->
        <v-col cols="auto">
          <v-pagination
            v-model="currentPage"
            :length="store.total_page"
            :total-visible="store.per_page"
            @click="handlePageChange"
            density="compact"
            active-color="primary"
          ></v-pagination>
        </v-col>
      </v-row>
      <!-- End::Pagination and Items per Page -->
    </template>

  </v-data-table>
  <!-- End Usert type List  -->

  <!-- Begin::Edit create user type right navigationbar -->
  <v-navigation-drawer
    v-model="drawerRight"
    location="right"
    sticky
    width="750"
    temporary
    scrim
  >
    <v-card-title class="bg-primary">
      <span class="text-h6" v-if="selectedIds!=''">Edit Tags</span>
      <span class="text-h6" v-if="selectedIds==''">Add Tags</span>
      <v-btn
        class="float-end"
        size="x-small"
        icon="mdi-close"
        color="red"
        @click.stop="drawerRight = !drawerRight"
        title="Close"
      ></v-btn>
    </v-card-title>

    <EditCreateTagsModel
      class="pa-4"
      :selectedIds="selectedIds"
      v-if="drawerRight"
      v-on:isSubmit="onSubmitChange($event)"
    ></EditCreateTagsModel>
  </v-navigation-drawer>
  <!-- End::Edit create user type right navigationbar -->
</template>

<script src="./manage-tags.ts"></script>