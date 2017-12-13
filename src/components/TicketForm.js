import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, NestedForm, Text } from 'react-form'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ReactS3Uploader from 'react-s3-uploader'
import { createTicket, getSignedUrl } from '../actions'
import _ from 'lodash'
import 'react-datepicker/dist/react-datepicker.css'


class TicketForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {  startDate: moment(), endDate: moment() }
    // if(this.props.selected===''){
    //     this.state = {  startDate: moment(), endDate: moment() }
    // }else{
    //     this.state = {  startDate: this.props.selected.start_at, endDate: this.props.selected.end_at }
    // }

  }
  componentWillMount(){
      console.log('hihello');
        this.setState({startDate: moment(this.props.selected.start_at), endDate: moment(this.props.selected.end_at)})
  }
  //
  // componentDidMount(){
  //   console.log(moment(this.props.selected.start_at));
  //   if(this.props.selected===''){
  //       console.log('hi');
  //   }else{
  //       console.log('bye');
  //   }
  // }

  handleSubmit(values, e, formApi) {

      console.log(values);
      this.props.createTicket(values)
      .then(() => {
        alert("공연을 추가했습니다.");
        formApi.resetAll()
      })
      .catch(err => { console.log(err); alert(err) })
  }

  render() {
    const Artist = ({ i, handleRemove, artist }) => {
        return (
            <NestedForm field={['artists', i]} key={`artist-${i}`}>
                <Form defaultValues={artist}>
                    {formApi => (
                        <div>
                            <div>
                                <Text field="name" placeholder="아티스트 이름"/>
                            </div>
                            <div>
                                {formApi.values.image && <img src={formApi.values.image}/>}
                                <ReactS3Uploader accept="image/*" getSignedUrl={this.props.getSignedUrl}
                                                 onFinish={sign => formApi.setValue('image', sign.filePath)}/>
                            </div>
                            <button onClick={e => {
                                e.preventDefault();
                                handleRemove(e)
                            }}>삭제
                            </button>
                    </div>)}
                </Form>
            </NestedForm>
        );
    };
    // TODO validation
    return (
        <Form onSubmit={this.handleSubmit}
            defaultValues={
                {
                    title: this.props.selected.title || '',
                    place: this.props.selected.place || '',
                    image: this.props.selected.image || '',
                    music_id: this.props.selected.music_id || '',
                    video_id: this.props.selected.video_id || '',
                    article: this.props.selected.article || '',
                    capacity: this.props.selected.capacity ||0,

                    start_at: this.props.selected.start_at || moment(),
                    end_at:this.props.selected.end_at || moment(),

                    artists: this.props.selected.artists || []
                }
            }
        >
        { formApi => (
            <form onSubmit={formApi.submitForm}>
                <div>
                      <h3>기본 정보</h3>
                      <div>
                            <Text field="title" placeholder="공연이름" />
                      </div>
                      <div>
                            <Text field="place" placeholder="공연장소" />
                      </div>
                  <div>
                    대표이미지
                    { formApi.values.image && <img src={formApi.values.image} /> }
                    <ReactS3Uploader accept="image/*" getSignedUrl={this.props.getSignedUrl}
                      onProgress={ percent => this.setState({ uploadProgress: percent }) }
                      onFinish={ sign => { this.setState({ uploadProgress: null }); formApi.setValue('image', sign.filePath) } } />
                    { !!this.state.uploadProgress && `${this.state.uploadProgress}% 완료` }
                  </div>
                </div>
                <div>
                  <h3>공연일정</h3>
                  <DatePicker selected={ this.state.startDate}
                    showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="LLL"
                    onChange={date =>
                      {
                        this.setState({ startDate: date });
                        formApi.setValue("start_at", date)
                      }
                    } />
                  <DatePicker selected={  this.state.endDate}
                    showTimeSelect timeFormat="HH:mm" timeIntervals={15} dateFormat="LLL"
                    onChange={date => {
                      this.setState({ endDate: date });
                      formApi.setValue("end_at", date);
                    } } />
                </div>
                <div>
                  <h3>확보 좌석 수</h3>
                  <input type="number" name="capacity" value={formApi.values.capacity}
                    onChange={e => formApi.setValue(e.target.name, e.target.value)} />
                </div>
                <div>
                  <h3>라인업</h3>

                        {
                        formApi.values.artists && _.map(formApi.values.artists, (a, index) =>
                              <Artist key={index} artist={a} i={index} handleRemove={() => formApi.removeValue('artists', index)} />
                            )
                        }
                          <button onClick={e => { e.preventDefault(); formApi.addValue('artists', {}) } }>추가</button>

                </div>
                <div>
                  <h3>선택입력</h3>
                  <Text field="music_id" placeholder="음악 아이디 (선택)" />
                  <Text field="video_id" placeholder="비디오 아이디 (선택)" />
                  <Text field="article" placeholder="웹뷰 주소 (선택)" />
                </div>
                <button type="submit">{this.props.selected ==='' ? '추가하기' : '수정하기'}</button>
        </form>
        )
      }
    </Form>
    )
  }
}

export default connect(null, { createTicket, getSignedUrl })(TicketForm)
