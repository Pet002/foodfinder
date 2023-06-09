const templates = (datas) => ({
  type: "template",
  altText: "this is a carousel template",
  template: {
    type: "carousel",
    columns: carousel(datas),
  },
})


const carousel = (datas) => {
    return datas.map((data) => {
        return {
            title: data.store_name,
            text: "Text",
            actions: [
              {
                type: "message",
                label: "ส่งตำแหน่งร้านนี้",
                text: `แสดงตำแหน่งร้าน ${data.store_name}`,
              },
            ],
          }
    })
}
module.exports = {templates}