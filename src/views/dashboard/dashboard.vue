<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="3">
        <v-card width="250" height="175" :to="'/tags'">
          <v-toolbar height="40" class="grey">
            <v-toolbar-title>
              <p class="text-center text-subtitle-2">Total Tags</p>
            </v-toolbar-title>
          </v-toolbar>
          <div class="text-center ma-2">
            <v-progress-circular
              :rotate="360"
              :size="90"
              :width="15"
              :model-value="store.dashboardData.total_tag_percentage"
              color="primary"
              class="text-caption px-2"
            >
              {{ store.dashboardData.total_tag_percentage }} %
            </v-progress-circular>
          </div>
          <div>
            <p class="text-center text-body-2">
              <span class="mdi mdi-tag"></span>{{ store.dashboardData.total_tag }}
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card width="250" height="175" :to="'/to-do'">
          <v-toolbar height="40" class="grey">
            <v-toolbar-title>
              <p class="text-center text-subtitle-2">Total Pending Todo</p>
            </v-toolbar-title>
          </v-toolbar>
          <div class="text-center ma-2">
            <v-progress-circular
              :rotate="360"
              :size="90"
              :width="15"
              :model-value="store.dashboardData.total_pending_percentage"
              color="pink"
              class="text-caption px-2"
            >
              {{ store.dashboardData.total_pending_percentage }} %
            </v-progress-circular>
          </div>
          <div>
            <p class="text-center text-body-2">
              <span class="mdi mdi-checkbox-blank-circle me-2"></span>{{ store.dashboardData.total_todo_pending }}
              
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card width="250" height="175" :to="'/to-do'">
          <v-toolbar height="40" class="grey">
            <v-toolbar-title>
              <p class="text-center text-subtitle-2">Total Complated Todo</p>
            </v-toolbar-title>
          </v-toolbar>
          <div class="text-center ma-2">
            <v-progress-circular
              :rotate="360"
              :size="90"
              :width="15"
              :model-value="store.dashboardData.total_complated_percentage"
              color="orange"
              class="text-caption px-2"
            >
              {{ store.dashboardData.total_complated_percentage }} %
            </v-progress-circular>
          </div>
          <div>
            <p class="text-center text-body-2">
              <span class="mdi mdi-check-circle me-2"></span>{{ store.dashboardData.total_todo_complated }}
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" sm="3">
        <v-card width="250" height="175" :to="'/to-do'">
          <v-toolbar height="40" class="grey">
            <v-toolbar-title>
              <p class="text-center text-subtitle-2">Total Todo List</p>
            </v-toolbar-title>
          </v-toolbar>
          <div class="text-center ma-2">
            <v-progress-circular
              :rotate="360"
              :size="90"
              :width="15"
              :model-value="store.dashboardData.total_todo_percentage"
              color="teal"
              class="text-caption px-2"
            >
              {{ store.dashboardData.total_todo_percentage }} %
            </v-progress-circular>
          </div>
          <div>
            <p class="text-center text-body-2">
              <span class="mdi mdi-format-list-checks me-2"></span>{{ store.dashboardData.total_todo }}
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="7">
        <v-row>
          <v-col cols="12" sm="4">
            <v-select
              label="Select Year"
              variant="outlined"
              density="compact"
              :items="year"
            >
            </v-select>
          </v-col>
        </v-row>

        <Bar
          id="my-chart-id"
          :options="chartOptions"
          :data="chartData"
          style="color: blue"
        />
      </v-col>
      <v-col cols="12" sm="4" class="text-end">
        <Pie :data="chartConfig" :options="chartOptions" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <Line :data="chartLineData" :options="chartOptions" />
      </v-col>
      <v-col cols="12" sm="6">
        <v-card>
          <div class="ma-2">
            <v-card style="background-color: azure">
              <p class="ma-2">
                1.The Education of a child is one of the most important
                decisions a parent can make. While there are many different
                types of educational options available,
              </p>
            </v-card>
          </div>
          <div class="ma-2">
            <v-card style="background-color: beige">
              <p class="ma-2">
                2. not all are created equal. Children in India have the unique
                opportunity to receive a world-class education, thanks to the
                many excellent schools that are available. Since ancient times,
                India has been known for its great educational system.
              </p>
            </v-card>
          </div>
          <div class="ma-2">
            <v-card style="background-color: bisque">
              <p class="ma-2">
                3. The country's first university, Nalanda, was founded over
                1,000 years ago. Today, there are thousands of schools in India,
                many of which are among the best in the world.
              </p>
            </v-card>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
  
<script src="./dashboard.ts"></script>