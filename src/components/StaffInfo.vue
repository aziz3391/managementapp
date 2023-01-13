<template>
  <div class="container">
    <div class="d-flex">
      <h2>List of Staff</h2>
      <button class="btn btn-success" @click="toggle()">Add new staff</button>
    </div>
    <AddStaff v-if="toggle" />
    <button v-if="false" @click="undo1()" class="undo2">Undo</button>
    <table class="table">
      <thead v-if="staff.length > 0">
        <tr>
          <td>№</td>
          <td>Name</td>
          <td>Department</td>
          <td>Salary</td>
          <td></td>
        </tr>
      </thead>
      <tbody v-if="staffs.length > 0">
        <tr v-for="(vstaff, index) in staffs" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ vstaff.name }}</td>
          <td>{{ vstaff.department }}</td>
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
  </div>
</template>

<script>
import axios from "axios";
import AddStaff from "@/components/AddStaff";
export default {
  component: {
    AddStaff,
  },
  data() {
    return {
      toggl: false,
      undo: {},
      staffs: [],
      staff: {
        department: "0",
      },
      stateundo: false,
      url: "http://localhost:3000",
    };
  },
  methods: {
    toggle() {
      this.toggl = !this.toggl;
      console.log(this.toggl);
    },
    add() {
      axios.post(`${this.url}/staff`, this.staff).then((res) => {
        if (res.status == 201) {
          this.staffs.push(res.data);
        }
        this.staff = {};
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
    undo1() {
      console.log(this.undo);
      axios.post(`${this.url}/staff`, this.undo).then((res) => {
        if (res.status == 201) {
          this.staffs.push(res.data);
        }
        this.undo = {};
      });
    },
  },
  mounted() {
    axios.get(`${this.url}/staff`).then((res) => {
      if (res.status == 200) {
        this.staffs = res.data;
      }
    });
  },
};
</script>

<style lang="scss">
@import "/src/styles/Staff";
</style>