<template>
  <v-form
    lazy-validation
    autocomplete="off"
    v-model="valid"
    ref="form"
    class="ma-2"
  >
    <v-row>
      <v-col cols="12" sm="12">
        <label class="">Name</label>
        <v-text-field
          v-model="userTypesData.name"
          :rules="rules.required"
          placeholder="Name"
          variant="outlined"
          hide-details="auto"
          color="primary"
          density="compact"
        >
        </v-text-field>

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