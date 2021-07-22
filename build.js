let inte = require('./build/inteBundle')
let pack = require('./build/pack')
let operation = process.argv[2]
let platform = process.argv[3]?process.argv[3]:'android'
if(operation == 'bundle'){
    inte.inteBundle(platform)
} else {
    pack.pack()
}
