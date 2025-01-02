import { Bar } from "vue-chartjs";
import { Pie } from "vue-chartjs";
import { Line } from "vue-chartjs";
import { defineComponent, ref, onMounted } from "vue";
import { useAppStore } from "@/store/app";

import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement
);

export default defineComponent({
  components: { Bar, Pie, Line },
  setup() {
    const store = useAppStore();

    const year = ref([2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007]);
    const chartLineData = ref({
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 39, 10, 40, 39, 80, 40],
        },
      ],
    });
    const chartConfig = ref({
      labels: ["VueJs", "EmberJs", "ReactJs", "AngularJs"],
      datasets: [
        {
          backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
          data: [40, 20, 80, 10],
        },
      ],
    });
    const chartData = ref({
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "Jun",
        "Julay",
        "Augast",
        "September",
        "Octomber",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20, 12, 40, 20, 12, 40, 20, 12, 40, 20, 12],
          // backgroundColor: "#f87979",
        },
      ],
    });
    const chartOptions = ref({ responsive: true });

    onMounted(() => {
        store.getAuthUser();
    });

    

    return {
      store,
      year,
      chartLineData,
      chartConfig,
      chartData,
      chartOptions,
    };
  },
});
