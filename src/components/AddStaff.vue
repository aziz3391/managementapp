<template>
  <div class="modalbox">
    <div class="info">
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
      <input type="date" class="form-control" v-model="staff.date" />
      <input
        type="text"
        class="form-control"
        placeholder="Salary"
        v-model="staff.salary"
      />
      <button @click="add()" id="btn" class="btn btn-success">Add staff</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "/src/styles/addstaff";
</style>