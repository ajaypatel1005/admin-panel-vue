<template>
    <v-form lazy-validation autocomplete="off" v-model="valid" ref="form">
      <v-toolbar class="bg-primary">
        <v-toolbar-title>Forgot Password</v-toolbar-title>
      </v-toolbar>
      <v-card-text>

        <v-alert
            v-model="isSuccessAlert"
            color="info"
            icon="mdi-email"
            variant="tonal"
            class="mb-2"
            density="compact"
            closable
            prominent
            >
            Verification link sended to your <strong>Email</strong> please check your mail inbox
            </v-alert>

        <v-text-field
          v-model="forgotData.email_id"
          :rules="rules.email"
          color="primary"
          label="Email"
          variant="underlined"
          autocomplete="email"
        
        ></v-text-field>
  
      </v-card-text>
  
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="outlined" color="primary" outlined @click="onSubmit()"
          ><v-icon>mdi-lock</v-icon> {{ sendBtnText }}
        </v-btn>
       
        <v-spacer></v-spacer>
      </v-card-actions>

      <v-row class="mb-1">
      <v-col cols="12" sm="12" class="text-center">
       <a href="#" class="me-4"><router-link to="/">Sign In </router-link></a>
      </v-col>
    </v-row>

    </v-form>
  </template>

  <script src="./forgot-password.ts"></script>