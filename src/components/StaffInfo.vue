<template>
  <div class="container">
    <div class="d-flex">
      <h2>List of Staff</h2>
      <button class="btn btn-success" @click="toggle()">Add new staff</button>
    </div>

    <table class="table">
      <thead v-if="staffs.length > 0">
        <tr>
          <td>№</td>
          <td>Name</td>
          <td>Department</td>
          <td>Birthday</td>
          <td>Salary</td>
          <td></td>
        </tr>
      </thead>
      <tbody v-if="staffs.length > 0">
        <tr v-for="(vstaff, index) in staffs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ vstaff.name }}</td>
          <td>{{ getdepart(vstaff.department) }}</td>
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
    <AddStaff
      v-if="toggl"
      @adding="(staffobj) => add(staffobj)"
      @toggling="(child) => togglevalue(child)"
    />
  </div>
</template>

<script>
import axios from "axios";
import AddStaff from "@/components/AddStaff";
export default {
  components: {
    AddStaff,
  },

  data() {
    return {
      toggl: false,
      undo: {},
      depart: [],
      staffs: [],
      staff: {
        department: "0",
      },
      stateundo: false,
      url: "http://localhost:3000",
    };
  },
  methods: {
    getdepart(id) {
      let dep = this.depart.find((element) => element.id == id);
      // console.log(dep.title);
      return dep.title;
    },
    getage(day) {
      let date = new Date(day);
      // console.log(date.getFullYear());
      let tday = new Date();
      // console.log(tday.getFullYear());
      return tday.getFullYear() - date.getFullYear();
    },
    toggle() {
      this.toggl = !this.toggl;
      // console.log(this.forstaff);
    },
    togglevalue(child) {
      this.toggl = child;
      // console.log(this.toggl);
    },
    add(staffobj) {
      axios.post(`${this.url}/staff`, staffobj).then((res) => {
        if (res.status == 201) {
          this.staffs.push(res.data);
        }
        this.staffobj = {};
      });
    },
    remove(id) {
      if (confirm("Confirm your action of deletion")) {
        this.undo = {};
        axios.delete(`${this.url}/staff/${id}`).then((res) => {
          if (res.status == 200) {
            let index = this.staffs.findIndex((element) => element.id == id);
            this.staffs[index] = this.undo;
            if (index != -1) {
              this.staffs.splice(index, 1);
              this.stateundo = true;
            }
          }
        });
      }
    },
  },
  mounted() {
    axios.get(`${this.url}/staff`).then((res) => {
      if (res.status == 200) {
        this.staffs = res.data;
      }
    });
    axios.get(`${this.url}/departs`).then((res) => {
      if (res.status == 200) {
        this.depart = res.data;
      }
    });
  },
};
</script>

<style lang="scss">
@import "/src/styles/Staff";
</style>