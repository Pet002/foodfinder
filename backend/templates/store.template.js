const templates = {
  type: "template",
  altText: "this is a carousel template",
  template: {
    type: "carousel",
    columns: [array, array],
  },
};

const array = {
  title: "Title",
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
};


const carousel = (data) => {
    data.map(() => {
        
    })
}


module.exports