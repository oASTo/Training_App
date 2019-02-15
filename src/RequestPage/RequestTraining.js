import React, { Component } from 'react'
import {Field, reduxForm} from 'redux-form'


const renderField = ({
  input,
  label,
  type,
}) => (
  <div className='form-group'>
  <p>{label}</p>
    <input {...input} placeholder={label} type={type}/>
    
  </div>
)



export class RequestTraining extends Component {
 

  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>ini Request Training</h1>
      
      <form>
      <Field 
      name="Pengelola Training"
      type="text"
      component={renderField}
      label="Nama"
      />
      
      <Field 
      name="Topik"
      type="text"
      component={renderField}
      label="Topik"
      />
      
      <Field 
      name="Lokasi"
      type="text"
      component={renderField}
      label="Lokasi"
      />

      <Field 
      name="Tanggal Mulai"
      type="date"
      component={renderField}
      label="Tanggal Mulai"
      />

      <Field 
      name="Tanggal Berakhir"
      type="date"
      component={renderField}
      label="tanggal Berakhir"
      />

      <Field 
      name="Harga"
      type="text"
      component={renderField}
      label="Harga"
      />

</form>
</div>

    )
  }
}

RequestTraining = reduxForm({
  form :'request'
})(RequestTraining)

export default RequestTraining
