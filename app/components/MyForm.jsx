import { useFetcher } from '@remix-run/react';
import { useAppBridge } from '@shopify/app-bridge-react';
import { BlockStack, Box, Button, RadioButton, Text, TextField } from '@shopify/polaris'
import React, { useCallback, useEffect, useState } from 'react'

function MyForm() {
	const fetcher = useFetcher();
	const shopify = useAppBridge();
	const [fullName, setFullName] = useState('');
	const [age, setAge] = useState(0);
	const [value, setValue] = useState('disabled');
	const [loader, setLoader] = useState(false);

  const handleChangeRadio = useCallback(
    (_, newValue) => setValue(newValue),
    [],
  );

	const handleChange = useCallback(
		(newValue) => setFullName(newValue),
		[],
	);

	const handleChangeAge = useCallback(
		(newValue) => setAge(newValue),
		[],
	);


	function handleFormSubmit() {
		try {
			if(!fullName || age === 0) return;
			setLoader(true);
			const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("age", age);
			fetcher.submit(formData, {
				method:"POST",
				action:"/add-user"
			});
		} catch (error) {
			setLoader(false);
			console.log(error);
		}
	}

	useEffect(()=>{
		setLoader(false);
		if(fetcher.data?.success && fetcher.data?.userAdd) shopify.toast.show(fetcher.data.msg);
	},[fetcher.data])

	return (
		<Box>
			<BlockStack gap={"400"}>
				<Text as='h3' variant='headingMd'>Please fill this form</Text>
				<Box>
					<TextField
						label="Full Name"
						value={fullName}
						onChange={handleChange}
						autoComplete="off"
					/>
					<TextField
						label="Age"
						value={age}
						onChange={handleChangeAge}
						autoComplete="off"
					/>
					<Box paddingBlock={"300"}>
						<RadioButton
							label="Accounts are disabled"
							helpText="Customers will only be able to check out as guests."
							checked={value === 'disabled'}
							id="disabled"
							name="accounts"
							onChange={handleChangeRadio}
						/>
						<RadioButton
							label="Accounts are optional"
							helpText="Customers will be able to check out with a customer account or as a guest."
							id="optional"
							name="accounts"
							checked={value === 'optional'}
							onChange={handleChangeRadio}
						/>
					</Box>
					<Button loading={loader} onClick={handleFormSubmit} variant='primary'>Submit Form</Button>
				</Box>
			</BlockStack>
		</Box>
	)
}

export default MyForm