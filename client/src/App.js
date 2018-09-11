import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Dropzone from 'react-dropzone';

const UPLOAD_FILE_MUTATION = gql`
	mutation($file: Upload!) {
		uploadFile(file: $file)
	}
`;

export default () => (
  <Mutation mutation={UPLOAD_FILE_MUTATION}>
    {uploadFile => (
      <Dropzone onDrop={([file]) => uploadFile({ variables: { file } })}>
        <p>click to select files to upload.</p>
      </Dropzone>
		)}
  </Mutation>
);
