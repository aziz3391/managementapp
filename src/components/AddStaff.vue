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
            <option v-for="(item, index) in forstaff" :key="index" value="item">
              {{ item }}
            </option>
            <option value="management">management</option>
            <option value="IT department">IT department</option>
            <option value="security">security</option>
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
export default {
  data() {
    return {
      //   staffs: [],
      staff: {
        department: "0",
      },

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
  props: ["forstaff"],
};
</script>

<style lang="scss">
@import "/src/styles/addstaff";
</style>