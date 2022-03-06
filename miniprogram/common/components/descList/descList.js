Component({
  externalClasses: ["title-class", "content-class"],
  properties: {
    title: {
      type: String,
      value: "标题"
    },
    list: {
      type: Array,
      value: ["内容1", "内容2", "内容3"]
    }
  },
})
