<template>
  <div class="homepage">
    <div class="d-flex">
      <h2>Main</h2>

      <div class="d-flex" style="justify-content: end">
        <input type="text" class="form-control" v-model="depart" />
        <button @click="add()" class="btn btn-success">Add</button>
      </div>
    </div>

    <table class="table">
      <thead v-if="departs.length > 0">
        <tr>
          <td>№</td>
          <td>Name of department</td>
          <td>Number of staff</td>
          <td>Edition</td>
        </tr>
      </thead>
      <tbody v-if="departs.length > 0">
        <tr v-for="(item, index) in departs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ item.title }}</td>
          <td>
            <router-link :to="`/home/${item.id}`">
              {{ GetCount(item.id) }}
            </router-link>
          </td>
          <td>
            <button @click="remove(item.id)" class="btn btn-danger">
              <ion-icon name="close-outline"></ion-icon>
            </button>
            <button @click="change()" class="btn btn-warning">
              <ion-icon name="create-outline"></ion-icon>
            </button>
            <div v-if="state">this is a hint</div>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="3">
            <div class="text-center">For now there is nothing to show</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      url: "http://localhost:3000",
      departs: [],
      depart: "",
      state: false,
      workers: [],
      num: [],
    };
  },
  components: {},
  methods: {
    GetCount(id) {
      let number = this.workers.filter((worker) => worker.department == id);
      return number.length;
    },
    change() {
      if (confirm("you wanna change")) {
        this.state = !this.state;
      }
    },

    remove(id) {
      if (confirm("Confirm your action"))
        axios.delete(`${this.url}/departs/${id}`).then((res) => {
          if (res.status == 200) {
            let index = this.departs.findIndex((depart) => depart.id == id);
            if (index !== -1) {
              this.departs.splice(index, 1);
            }
          }
        });
    },
    add() {
      axios.post(`${this.url}/departs`, { title: this.depart }).then((res) => {
        if (res.status == 201) {
          this.departs.push(res.data);
          this.depart = "";
        }
      });
    },
  },
  mounted() {
    axios.get(`${this.url}/departs`).then((Departments) => {
      if (Departments.status == 200) {
        this.departs = Departments.data;
        console.log(this.departs);
      }
    });
    axios.get(`${this.url}/staff`).then((info) => {
      if (info.status == 200) {
        this.workers = info.data;
        // console.log(this.workers);
      }
    });
  },
};
</script>

<style lang="scss">
@import "/src/styles/homepage";
</style>