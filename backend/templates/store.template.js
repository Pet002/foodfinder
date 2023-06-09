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
                label: "Action 1",
                text: "Action 1",
              },
              {
                type: "message",
                label: "Action 2",
                text: "Action 2",
              },
            ],
          }
    })
}


module.exports = {templates}