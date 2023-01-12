<template>
  <div class="container">
    <div class="d-flex">
      <h2>Staff</h2>

      <div class="d-flex">
        <input
          type="text"
          class="form-control"
          placeholder="Name"
          v-model="staff.name"
        />
        <select class="form-select" v-model="staff.department">
          <option value="0" disabled>Department</option>
          <option value="finance">finance</option>
          <option value="management">management</option>
          <option value="IT department">IT department</option>
          <option value="security">security</option>
        </select>
        <input
          type="text"
          class="form-control"
          placeholder="Salary"
          v-model="staff.salary"
        />
        <button @click="add()" id="btn" class="btn btn-success">
          Add staff
        </button>
      </div>
    </div>
    <button v-if="stateundo" @click="undo1()" class="undo2">Undo</button>
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
export default {
  data() {
    return {
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