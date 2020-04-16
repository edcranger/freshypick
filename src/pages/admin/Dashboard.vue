<template>
  <q-page padding>
    <div class="row">
      <div class="col-xs-12 col-sm-4 text-white">
        <div
          class="row items-center content-center q-ma-sm bg-orange q-pa-lg shadow-1"
        >
          <div class="col-xs-12 col-sm-7 text-center">
            <h6 class="text-h6 q-ma-none">83</h6>
            <h6 class="text-subtitle2 q-ma-none q-mb-sm">New Orders</h6>
          </div>
          <div class="col-xs-12 col-sm-4 text-center">
            <q-avatar
              size="100"
              font-size="30px"
              color="white"
              text-color="orange"
              icon="fas fa-hand-point-down"
            />
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-sm-4 text-white">
        <div
          class="row items-center content-center q-ma-sm bg-indigo q-pa-lg shadow-1"
        >
          <div class="col-xs-12 col-sm-7 text-center">
            <h6 class="text-h6 q-ma-none">83</h6>
            <h6 class="text-subtitle2 q-ma-none q-mb-sm">For Packing</h6>
          </div>
          <div class="col-xs-12 col-sm-4 text-center">
            <q-avatar
              size="100"
              font-size="30px"
              color="white"
              text-color="indigo"
              icon="fas fa-box"
            />
          </div>
        </div>
      </div>

      <div class="col-xs-12 col-sm-4 text-white">
        <div
          class="row items-center content-center q-ma-sm bg-light-green-6 q-pa-lg shadow-1"
        >
          <div class="col-xs-12 col-sm-7 text-center">
            <h6 class="text-h6 q-ma-none">83</h6>
            <h6 class="text-subtitle2 q-ma-none q-mb-sm">For Delivery</h6>
          </div>
          <div class="col-xs-12 col-sm-4 text-center">
            <q-avatar
              size="110"
              font-size="29px"
              color="white"
              text-color="light-green-6"
              icon="fas fa-truck-loading"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="row q-ma-sm justify-center align-center text-center content-center"
    >
      <div class="col-xs-12 col-sm-6">
        <div class="row bg-white q-pa-md q-ma-xs justify-center">
          <div class="col-12">
            <p class="text-subtitle2">Sales for today</p>
            <div class="q-pa-sm">
              <apexchart
                height="180"
                type="donut"
                :options="options"
                :series="pieSeries"
              ></apexchart>
            </div>
          </div>
          <!-- <q-separator inset /> -->

          <div class="col-12">
            <p class="q-mt-md text-subtitle2">Inventory</p>
            <apexchart
              height="200"
              class="row bg-white q-ma-xs"
              type="bar"
              :options="chartOptions"
              :series="columnSeries"
            ></apexchart>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6">eds</div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      options: {
        chart: {
          type: "pie"
        },
        labels: ["Carrots", "Cabbage", "grapes"]
      },
      pieSeries: [22, 1, 4, 4, 10],

      columnSeries: [
        {
          data: [21, 22, 10, 28, 16, 21, 13]
        }
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "bar"
        },

        plotOptions: {
          bar: {
            columnWidth: "45%",
            distributed: true
          }
        },
        dataLabels: {
          enabled: false
        },
        legend: {
          show: false
        },
        xaxis: {
          categories: [
            ["John", "Doe"],
            ["Joe", "Smith"],
            ["Jake", "Williams"],
            ["Peter", "Brown"],
            ["Mary", "Evans"],
            ["David", "Wilson"],
            ["Lily", "Roberts"]
          ],
          labels: {
            style: {
              fontSize: "12px"
            }
          }
        }
      }
    };
  }
};
</script>

<style></style>
