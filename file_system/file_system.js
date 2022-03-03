const fs = require('fs');
const path = require('path')
fs.readFile(path.join(__dirname, '..', '/assets/story.txt'), (error, data) => {
    if(error) {
        throw error;
    }
    console.log(data.toString());
})
const content = ' "Come, Little Red Riding Hood, here is a piece of cake and a bottle of wine. Take them to your grandmother, she is ill and weak, and they will do her good.'
fs.appendFile(path.join(__dirname, '..', '/assets/story.txt'), content, err => {
    if (err) {
      console.error(err)
      return
    }
})