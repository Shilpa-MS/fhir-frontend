import Axios from 'axios';

const instance=Axios.create({
    baseURL:"http://node-to-fhir-server-git-fhir.cp4i2021-tcs-jumpstart-6fb0b86391cd68c8282858623a1dddff-0000.eu-gb.containers.appdomain.cloud/"
})

export default instance;