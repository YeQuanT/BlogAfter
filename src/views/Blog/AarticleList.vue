<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      :row-class-name="tableRowClassName"
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
            <el-table-column label="标签" width="150">
        <template slot-scope="{row}">
          <ElTag v-show="row.tag" style="margin-left:5px" size="mini" type="success" v-for="item in row.tag" :key="item">{{item}}</ElTag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="更新时间"
        width="200"
      >
        <template slot-scope="{ row }">
          <i class="el-icon-time" />
          <span>{{ new Date(row.updatetime).toLocaleString() }}</span>
        </template>
      </el-table-column>

      <el-table-column
        class-name="status-col"
        label="操作"
        width="200"
        align="center"
      >
        <template slot-scope="{ row }">
          <ElButton type="primary" size="mini" @click="edit(row._id)"
            >编辑</ElButton
          >
          <ElButton v-if="row.status == 'normal'" @click="del(row)" type="danger" size="mini">删除</ElButton>

          <el-popconfirm
            v-else
            confirm-button-text="彻底删除"
            confirm-button-type="danger"
            cancel-button-text="恢复正常"
            cancel-button-type="primary"
            icon-color="red"
            style="margin-left: 10px"
            @onConfirm="del(row)"
            @onCancel="del(row, 'setNormal')"
            title="彻底删除？"
          >
            <ElButton slot="reference" type="danger" size="mini">删除</ElButton>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="fetchData" />
  </div>
</template>

<script>
import { delArticle, getList } from "@/api/blog";
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  components:{Pagination},
  data() {
    return {
      list: null,
      listLoading: true,
       total: 50,
       listQuery:{
        page:0,
        limit:10,
       }
       
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getList(this.listQuery).then((response) => {
        console.log(response);
        this.total = response.total
        this.list = response.data;
        this.listLoading = false;
      });
    },
    edit(id) {
      this.$router.push({ name: "AddArticle", params: { id } });
    },
    del(row, val=false) {
        let status = val ? val : row.status
      delArticle({ _id: row._id, status }).then(
        (res) => {
          console.log("删除文章", res);
          this.fetchData();
        }
      );
    },
    tableRowClassName({ row }) {
      console.log("文章状态", row.status);
      if (row.status == "deleted") {
        return "warning-row";
      }
      return "";
    },
  },
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>
