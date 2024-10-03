import { MediaCard } from '@shopify/polaris'
import React from 'react'
import MyForm from './MyForm'

function MainFormComponent() {
	return (
		<MediaCard
      title={<MyForm />}
      popoverActions={[{content: 'Dismiss', onAction: () => {}}]}
    >
      <img
        alt=""
        width="100%"
        height="100%"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        src="/basin-shopify-custom-forms.png"
      />
    </MediaCard>
	)
}

export default MainFormComponent