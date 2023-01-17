<template>
  <div class="header">
    <h1 class="text">{{ title }}</h1>
  </div>
  <table class="table">
    <thead v-if="somestaffs.length > 0">
      <tr>
        <td>№</td>
        <td>Name</td>

        <td>Birthday</td>
        <td>Salary</td>
        <td></td>
      </tr>
    </thead>

    <tbody v-if="somestaffs.length > 0">
      <tr v-for="(vstaff, index) in somestaffs" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ vstaff.name }}</td>

        <td>{{ getage(vstaff.date) }}</td>
        <td>{{ vstaff.salary }}</td>
        <td>
          <button @click="remove(vstaff.id)" class="btn btn-danger">X</button>
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
</template>

<script>
import axios from "axios";
export default {
  methods: {
    getage(day) {
      let date = new Date(day);
      console.log(date.getFullYear());
      let tday = new Date();
      console.log(tday.getFullYear());
      return tday.getFullYear() - date.getFullYear();
    },
    remove(id) {
      if (confirm("Confirm your action of deletion")) {
        axios.delete(`${this.url}/${id}`).then((res) => {
          if (res.status == 200) {
            let index = this.somestaffs.findIndex(
              (element) => element.id == id
            );
            if (index != -1) {
              this.somestaffs.splice(index, 1);
            }
          }
        });
      }
    },
  },
  data() {
    return {
      somestaffs: [],
      staffs: [],
      fordep: [],
      title: "error",
      id: this.$route.params.id,
      url: "http://localhost:3000/staff",
      uri: "http://localhost:3000/departs",
    };
  },
  mounted() {
    axios.get(`${this.uri}`).then((res) => {
      if (res.status == 200) {
        this.fordep = res.data;
        let name = this.fordep.find((element) => element.id == this.id);

        this.title = name.title;
        console.log(this.title);
      }
    });
    axios.get(`${this.url}?department=${this.id}`).then((res) => {
      if (res.status == 200) {
        this.somestaffs = res.data;
        console.log(res.data);
      }
    });
  },
};
</script>

<style lang="scss">
@import "/src/styles/staffdep";
</style>