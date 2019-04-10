import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../../ui/components/uploader'
import Card from '../../ui/components/card'
import failedIcon from './failed.svg'

import './app.scss'

const Uploads = ({uploads, actions}) => {
	const pendingFiles = uploads.files.filter(({progress}) => progress && progress < 100)
	const completedFiles = uploads.files.filter(({progress}) => !progress)

	return <div>
		<h1>Upload Images</h1>
		{/* do not delete this uploader component */}
		<Uploader upload={actions.upload} />
		{/* do not delete this uploader component */}

		<h2>In Progress</h2>
		just a sample to test UI:
		<progress value="40" max="100"></progress>
		<ul>
			{pendingFiles.map(file => {
				const {id, name, progress} = file
				return <li key={id}>
					<label>{name}</label>
					<progress value={progress} max="100">{progress}%</progress>
				</li>
			})}
		</ul>

		<h2>Failed</h2>
		<ul>
			{completedFiles.filter(file => file.error).map(file => {
				const {id, name, url, error} = file
				return <FailureCard { ...file } />
			})}
		</ul>
		<h2>Completed</h2>
		<ul class="gallery">
			{completedFiles.filter(file => !file.error).map(file => {
				const {id, name, url, error} = file
				return <Card { ...file } />
			})}
		</ul>
	</div>
}

// const Card = ({ id, name, url, error}) => (
// 	<li key={id} className="card">
// 		{!error && <img src={url} style={{maxWidth: `200px`}} />}
// 		<h2>{name}</h2>
// 	</li>
// )

const FailureCard = ({ id, name, url, error}) => (
	<li key={id} className="failedCard">
		<img src={failedIcon} style={{width: `50px`, height: `50px`}} />
		<div class="content">
			<h4>{name}</h4>
			{!!error && <p className="failure">{error}</p>}
		</div>
	</li>
)

const statusPropType = PropTypes.shape({
	status: PropTypes.oneOf([`init`, `pending`, `success`, `failure`]).isRequired,
	message: PropTypes.string.isRequired,
})

Uploads.propTypes = {
	uploads: PropTypes.shape({
		files: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			name: PropTypes.string.isRequired,
			progress: PropTypes.number,
			url: PropTypes.string,
			error: PropTypes.string,
		})).isRequired,
		update: statusPropType.isRequired,
		delete: statusPropType.isRequired,
		share: statusPropType.isRequired,
	}).isRequired,
	actions: PropTypes.object.isRequired,
}

export default Uploads
