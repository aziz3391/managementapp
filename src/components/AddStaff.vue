<template>
  <div class="outer">
    <div class="modalbox">
      <div class="info">
        <h4 class="txt">New staff</h4>
        <div class="namebox">
          <label for="name"> Name </label>
          <input
            id="name"
            type="text"
            style="width: 200px; color: #878787"
            class="form-control"
            placeholder="Name"
            v-model="staff.name"
          />
        </div>
        <div class="depbox">
          <label for="dep"> Department </label>
          <select
            id="dep"
            class="form-select"
            style="width: 200px; color: #878787"
            v-model="staff.department"
          >
            <option value="0" disabled>Department</option>
            <option
              v-for="(item, index) in dep"
              :key="index"
              :value="item.title"
            >
              {{ item.title }}
            </option>
          </select>
        </div>
        <div class="datebox">
          <label for="date"> Date </label>

          <input
            id="date"
            style="width: 200px; color: #878787"
            type="date"
            class="form-control"
            v-model="staff.date"
          />
        </div>
        <div class="salbox">
          <label for="sal"> Salary </label>
          <input
            id="sal"
            type="number"
            style="width: 200px; color: #878787"
            class="form-control"
            placeholder="Salary"
            v-model="staff.salary"
          />
        </div>
        <div class="flex">
          <button @click="add()" id="btn" class="btn btn-success">
            Add staff
          </button>
          <button id="back" @click="toggle()" class="btn btn-danger">
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      dep: [],
      staff: {
        department: "0",
      },
      url: "http://localhost:3000",
      toggle1: false,
    };
  },
  methods: {
    add() {
      this.$emit("adding", this.staff);
      this.staff = {};
      (this.staff = {
        department: "0",
      }),
        console.log(this.forstaff);
    },
    toggle() {
      this.$emit("toggling", this.toggle1);
    },
  },
  mounted() {
    axios.get(`${this.url}/departs`).then((res) => {
      if (res.status == 200) {
        this.dep = res.data;
      }
    });
  },
};
</script>

<style lang="scss">
@import "/src/styles/addstaff";
</style>