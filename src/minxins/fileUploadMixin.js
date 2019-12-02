import Store from '../store'
export default {
  methods: {
    onUploading() {
      Store.commit('setLoading', true);
    },
    onFail(errMsg) {
      Store.commit('setLoading', false);
      this.$toast(errMsg);
    },
    onUpLoadFile(file) {
      this.$nextTick(() => {
        Store.commit('setLoading', false);
      })
    },
    onDelete (file, fileArr) {
      let index = fileArr.indexOf(file);
      fileArr.splice(index, 1);
    },
    judgeLength (fileArr, maxLength = 6) {
      if (fileArr.length > maxLength) {
        return fileArr.slice(0, maxLength)
      }
      return fileArr;
    }
  }
}
