<template>
  <div>
    <TableView :titles="titles" :list="list"></TableView>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from "vue";
import TableView from "@/components/FixedTable.vue";
export default defineComponent({
  data() {
    return {
      titles: ["Id", "姓名", "性别", "年龄", "地址"],
      list: [
        {
          Id:1,
          name:'张三',
          sex:'男',
          age:18,
          address:'上海市闵行区',
        },
        {
          Id:2,
          name:'李四',
          sex:'女',
          age:19,
          address:'上海市静安区',
        },
        {
          Id:3,
          name:'王五',
          sex:'男',
          age:20,
          address:'上海市普陀区',
        },
      ] as any,
    };
  },
  mounted() {},
  components: {
    TableView,
  },
  methods: {},
});
</script>

<style scoped>
</style>