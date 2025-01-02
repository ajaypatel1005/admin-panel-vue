<template>
    <v-form lazy-validation autocomplete="off" v-model="valid" ref="form">
      <v-toolbar class="bg-primary">
        <v-toolbar-title>Reset Password</v-toolbar-title>
      </v-toolbar>
      
      <v-card-text v-if="isShowReset">
        <v-text-field
          v-model="resetData.new_password"
          color="primary"
          label="New password"
          variant="underlined"
          :rules="rules.required"
          autocomplete="email"
          :append-inner-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        @click:append-inner="passwordShow = !passwordShow"
        ></v-text-field>
  
        <v-text-field
          v-model="resetData.confirm_password"
          color="primary"
          label="Confirm new password"
          variant="underlined"
          autocomplete="email"
          :rules="[rules.required,passwordConfirmationRule]"
          :append-inner-icon="cmpPwdShowStatus ? 'mdi-eye' : 'mdi-eye-off'"
            :type="cmpPwdShowStatus ? 'text' : 'password'"
            @click:append-inner="cmpPwdShowStatus = !cmpPwdShowStatus"
        ></v-text-field>

      </v-card-text>
     
      <v-card-actions v-if="isShowReset">
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" outlined @click="onSubmit()"
          ><v-icon>mdi-lock</v-icon> Set New Password
        </v-btn>
       
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-card-text v-if="isShowReset==false">
        <v-alert
            color="error"
            icon="mdi-alert-circle"
            variant="tonal"
            class="mb-2"
            density="compact"
            prominent
            >
              {{ responseMessage }}
            </v-alert>
      </v-card-text>

      <v-row class="mb-1 mt-1">
      <v-col cols="12" sm="12" class="text-center"><a href="#" class="text-body-2 font-weight-regular"><router-link to="/forgot-password">Forgot Password ?</router-link></a> | <a href="#" class="me-4"><router-link to="/">Sign In </router-link></a></v-col>
    
    </v-row>

    </v-form>
</template>

<script src="./reset-password.ts"></script>