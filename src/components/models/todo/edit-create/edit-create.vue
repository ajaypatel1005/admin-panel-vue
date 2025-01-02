<template>
  <v-form
    lazy-validation
    autocomplete="off"
    v-model="valid"
    ref="form"
    class="ma-4"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <label class="">Title</label>
        <v-text-field
          v-model="todoData.title"
          :rules="rules.required"
          placeholder="Title"
          variant="outlined"
          hide-details="auto"
          color="primary"
          density="compact"
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12">
        <label class="">Description</label>
        <v-textarea
          v-model="todoData.description"
          placeholder="Description"
          variant="outlined"
          hide-details="auto"
          color="primary"
          density="compact"
          rows="3"
        >
        </v-textarea>
      </v-col>
      
      <v-col cols="12" sm="6">
        <label class="">Completed</label>
        <v-radio-group
          v-model="todoData.is_completed"
          :model-value="todoData.is_completed"
          inline
        >
          <v-radio label="Yes" :value="1"></v-radio>
          <v-radio label="No" :value="0"></v-radio>
        </v-radio-group>
      </v-col>
      
      <v-col cols="12" sm="12">
        <label class="">Tags</label>
        <v-select
        v-model="todoData.tags"
          v-if="tagData.length > 0"
          :items="tagData || []"
          item-title="name"
          item-value="id"
          label="Tags"
          chips
          multiple
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="ma-2 d-flex float-left">
      <v-col cols="12" sm="12">
        <v-btn
          variant="outlined"
          prepend-icon="mdi-content-save"
          color="primary"
          @click="onSubmit()"
          title="Submit"
          >Save</v-btn
        >
        <v-btn
          variant="outlined"
          prepend-icon="mdi-refresh"
          class="ms-2"
          color="error"
          @click="reset()"
          title="Reset"
          >Reset</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
  <!-- Begin::Loader for create/edit -->
  <v-overlay
    v-model="isLoaderShow"
    contained
    persistent
    style="z-index: 2000"
    class="align-center justify-center"
  >
    <v-progress-circular :size="50" indeterminate class="primary--text" />
  </v-overlay>
  <!-- Begin::Loader for create/edit -->
</template>
  
  <script src="./edit-create.ts"></script>