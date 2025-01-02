<template>
  <v-container fluid class="my-2">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="12" sm="4">
          <label class="">Old Password</label>
          <v-text-field
            v-model="changePasswordData.current_password"
            placeholder="Old Password"
            variant="outlined"
            hide-details="auto"
            color="primary"
            density="compact"
            :rules="rules.required"
            :append-inner-icon="pwdShowStatus ? 'mdi-eye' : 'mdi-eye-off'"
            :type="pwdShowStatus ? 'text' : 'password'"
            @click:append-inner="pwdShowStatus = !pwdShowStatus"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <label class="">New Password</label>
          <v-text-field
            v-model="changePasswordData.new_password"
            placeholder="New Password"
            variant="outlined"
            hide-details="auto"
            color="primary"
            density="compact"
            :rules="rules.required"
            :append-inner-icon="newPwdShowStatus ? 'mdi-eye' : 'mdi-eye-off'"
            :type="newPwdShowStatus ? 'text' : 'password'"
            @click:append-inner="newPwdShowStatus = !newPwdShowStatus"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="4">
          <label class="">Confirm Password </label>
          <v-text-field
            v-model="changePasswordData.confirm_password"
            placeholder="Confirm Password"
            variant="outlined"
            hide-details="auto"
            color="primary"
            density="compact"
            :rules="[rules.required, passwordConfirmationRule]"
            :append-inner-icon="cmpPwdShowStatus ? 'mdi-eye' : 'mdi-eye-off'"
            :type="cmpPwdShowStatus ? 'text' : 'password'"
            @click:append-inner="cmpPwdShowStatus = !cmpPwdShowStatus"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex float-right mt-5">
        <v-btn
          variant="outlined"
          class="ms-1"
          color="primary"
          prepend-icon="mdi-content-save"
          @click="onSubmit()"
          title="Submit"
          >Save</v-btn
        >
        <v-btn
          variant="outlined"
          class="ms-1"
          prepend-icon="mdi mdi-refresh"
          color="error"
          @click="reset()"
          title="Reset"
          >Reset</v-btn
        >
        <v-btn
          prepend-icon="mdi-arrow-left-drop-circle-outline"
          variant="outlined"
          class="ms-1"
          color="primary"
          @click="$router.go(-1)"
          title="Back"
          >Back</v-btn
        >
      </div>
    </v-form>
  </v-container>
</template>

<script src="./change-password.ts"></script>