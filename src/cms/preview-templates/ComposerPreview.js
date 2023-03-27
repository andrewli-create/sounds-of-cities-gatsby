import React from 'react'
import PropTypes from 'prop-types'
import { ComposerTemplate } from '../../templates/composer'
import { Helmet } from "react-helmet";

const ComposerPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(['data', 'tags'])
  return (
    // <div>
    //   {tags}
    // </div>
    <ComposerTemplate
        content={entry.getIn(['data', 'html'])}
        contentComponent={entry.getIn(['data', 'html'])}
        description={entry.getIn(['data', 'description'])}
        profileImage={entry.getIn(['data', 'profileImage'])}
        coverImage={entry.getIn(['data', 'coverImage'])}
        composition={entry.getIn(['data', 'composition'])}
        instrumentation={entry.getIn(['data', 'instrumentation'])}
        website={entry.getIn(['data', 'website'])}
        socialMediaA={entry.getIn(['data', 'socialMediaA'])}
        socialMediaB={entry.getIn(['data', 'socialMediaB'])}
        socialHandleA={entry.getIn(['data', 'socialHandleA'])}
        socialHandleB={entry.getIn(['data', 'socialHandleB'])}
        bio={entry.getIn(['data', 'bio'])}
        programmeNotes={entry.getIn(['data', 'programmeNotes'])}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`title`}</title>
            <meta
              name="description"
              content={`description`}
            />
          </Helmet>
        }
        tags={entry.getIn(['data', 'tags'])}
        title={entry.getIn(['data', 'title'])}
      />
    // <ComposerTemplate
    //   content={widgetFor('body')}
    //   description={entry.getIn(['data', 'description'])}
    //   tags={tags && tags.toJS()}
    //   title={entry.getIn(['data', 'title'])}
    // />
  )
}

ComposerPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ComposerPreview
