import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {FaSearch} from 'react-icons/fa'

import Header from '../Header'
import Profile from '../Profile'
import JobsCard from '../JobsCard'
import ApiFailureCase from '../ApiFailureCase'

import './index.css'

class JobsPage extends Component {
  state = {
    isProfileApiSuccess: true,
    isProfileLoading: true,
    isJobsListLoading: true,
    isJobsApiSuccess: true,
    profiledata: {},
    jobsData: [],
    jobsDataDublicate: [],
    checkbox: [],
    isChecked1: false,
    isChecked2: false,
    isChecked3: false,
    isChecked4: false,
    radioElement: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.gettingTheJobs()
  }

  getProfileDetails = async () => {
    const profileApiUrl = 'https://apis.ccbp.in/profile'
    const token = Cookies.get('token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(profileApiUrl, options)
    const data = await response.json()
    const updatedData = {
      name: data.profile_details.name,
      profileImageUrl: data.profile_details.profile_image_url,
      shortBio: data.profile_details.short_bio,
    }
    if (response.ok) {
      this.setState({
        isProfileApiSuccess: true,
        profiledata: updatedData,
        isProfileLoading: false,
      })
    } else {
      this.setstate({isProfileApiSuccess: false, isProfileLoading: false})
    }
  }

  gettingTheJobs = async () => {
    const {radioElement, searchInput, checkbox} = this.state
    let jobsApiUrl
    if (checkbox.length === 0) {
      jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${'PARTTIME'},${'FULLTIME'},${'FREELANCE'},${'INTERNSHIP'}&minimum_package=${radioElement}&search=${searchInput}`
    } else if (checkbox.length === 1) {
      jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]}&minimum_package=${radioElement}&search=${searchInput}`
    } else if (checkbox.length === 2) {
      jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]},${checkbox[1]}&minimum_package=${radioElement}&search=${searchInput}`
    } else if (checkbox.length === 3) {
      jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]},${checkbox[1]},${checkbox[2]}&minimum_package=${radioElement}&search=${searchInput}`
    } else {
      jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkbox[0]},${checkbox[1]},${checkbox[2]},${checkbox[3]}&minimum_package=${radioElement}&search=${searchInput}`
    }
    const token = Cookies.get('token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(jobsApiUrl)
    console.log(`hjkhjcbsvjbuvb`)
    const response = await fetch(jobsApiUrl, options)
    const data = await response.json()
    const updatedJobsData = data.jobs.map(eachOne => ({
      companyLogoUrl: eachOne.company_logo_url,
      employmentType: eachOne.employment_type,
      id: eachOne.id,
      jobDescription: eachOne.job_description,
      location: eachOne.location,
      packagePerAnnum: eachOne.package_per_annum,
      title: eachOne.title,
      rating: eachOne.rating,
    }))
    if (response.ok) {
      this.setState({
        jobsData: updatedJobsData,
        jobsDataDublicate: updatedJobsData,
        isJobsListLoading: false,
        isJobsApiSuccess: true,
      })
    } else {
      this.setState({isJobsApiSuccess: false, isJobsListLoading: false})
    }
  }

  onCheck1 = () => {
    const {isChecked1} = this.state
    if (isChecked1) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'FULLTIME'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'FULLTIME',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  onCheck2 = () => {
    const {isChecked2} = this.state
    if (isChecked2) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'PARTTIME'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'PARTTIME',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  onCheck3 = () => {
    const {isChecked3} = this.state
    if (isChecked3) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'FREELANCE'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'FREELANCE',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  onCheck4 = () => {
    const {isChecked4} = this.state
    if (isChecked4) {
      this.setState(
        prevState => ({
          checkbox: [...prevState.checkbox, 'INTERNSHIP'],
        }),
        this.gettingTheJobs,
      )
    } else {
      this.setState(
        prevState => ({
          checkbox: prevState.checkbox.filter(
            eachOne => eachOne !== 'INTERNSHIP',
          ),
        }),
        this.gettingTheJobs,
      )
    }
  }

  checkboxOne = () => {
    this.setState(
      prevState => ({isChecked1: !prevState.isChecked1}),
      this.onCheck1,
      this.gettingTheJobs,
    )
  }

  checkboxTwo = () => {
    this.setState(
      prevState => ({isChecked2: !prevState.isChecked2}),
      this.onCheck2,
      this.gettingTheJobs,
    )
  }

  checkboxThree = () => {
    this.setState(
      prevState => ({isChecked3: !prevState.isChecked3}),
      this.onCheck3,
      this.gettingTheJobs,
    )
  }

  checkboxFour = () => {
    this.setState(
      prevState => ({isChecked4: !prevState.isChecked4}),
      this.onCheck4,
      this.gettingTheJobs,
    )
  }

  onSalaryRange = value => {
    this.setState({radioElement: value}, this.gettingTheJobs)
  }

  onSearchButton = () => {
    this.gettingTheJobs()
    this.setState({searchInput: ''})
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickRetry = () => {
    console.log(`retyjb`)
    this.gettingTheJobs()
  }

  onLocationFiter = event => {
    const {jobsData, jobsDataDublicate} = this.state
    const checkedList = []
    const removedList = []
    if (event.target.checked) {
      const val = event.target.value
      if (val === 'HYDERABAD') {
        const result = jobsData.filter(eachOne => {
          if (eachOne.location === 'Hyderabad') {
            checkedList.push({val})
            return eachOne
          }
        })
        this.setState({jobsData: result})
      }
      if (val === 'CHENNAI') {
        const result = jobsData.filter(
          eachOne => eachOne.location === 'Chennai',
        )
        this.setState({jobsData: result})
      }
      if (val === 'BANGALORE') {
        const result = jobsData.filter(
          eachOne => eachOne.location === 'Bangalore',
        )
        this.setState({jobsData: result})
      }
      if (val === 'DELHI') {
        const result = jobsData.filter(eachOne => eachOne.location === 'Delhi')
        this.setState({jobsData: result})
      }
    } else {
      this.setState({jobsData: jobsDataDublicate})
    }
  }

  filterBlock = () => {
    const {profiledata, isProfileApiSuccess, isProfileLoading} = this.state
    return (
      <Profile
        details={profiledata}
        isSuccess={isProfileApiSuccess}
        firstCheckBox={this.checkboxOne}
        secondCheckBox={this.checkboxTwo}
        thirdCheckBox={this.checkboxThree}
        fourthCheckBox={this.checkboxFour}
        onClickRadio={this.onSalaryRange}
        isLoading={isProfileLoading}
        onRetryClick={this.onClickRetry}
        locationFilter={this.onLocationFiter}
      />
    )
  }

  renderdetails = () => {
    const {jobsData} = this.state
    let noDetails = false
    if (jobsData.length === 0) {
      noDetails = true
    }
    return noDetails ? (
      this.renderNoDetails()
    ) : (
      <ul className="ul-container-jobs">
        {jobsData.map(eachOne => (
          <JobsCard details={eachOne} key={eachOne.id} />
        ))}
      </ul>
    )
  }

  renderJobsSuccessOrFailureCase = () => {
    const {isJobsApiSuccess} = this.state

    return isJobsApiSuccess ? (
      this.renderdetails()
    ) : (
      <ApiFailureCase onRetry={this.onClickRetry} />
    )
  }

  renderJobsLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" height="50" width="50" color="#ffffff" />
    </div>
  )

  jobsCardBlock = () => {
    const {searchInput, isJobsListLoading} = this.state
    return (
      <div>
        <div className="job-search-container">
          <input
            value={searchInput}
            className="search-input"
            placeholder="Search"
            type="search"
            onChange={this.onSearchChange}
          />
          <div>
            <button
              data-testid="searchButton"
              className="search-button"
              type="submit"
              id="search"
              onClick={this.onSearchButton}
            >
              <FaSearch className="search-icon" aria-label="search" />
            </button>
          </div>
        </div>
        {isJobsListLoading
          ? this.renderJobsLoader()
          : this.renderJobsSuccessOrFailureCase()}
      </div>
    )
  }

  renderNoDetails = () => (
    <div className="failure-view-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1>No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
    </div>
  )

  render() {
    return (
      <>
        <Header />
        <div className="jobs-main-page">
          {this.filterBlock()}
          {this.jobsCardBlock()}
        </div>
      </>
    )
  }
}

export default JobsPage
