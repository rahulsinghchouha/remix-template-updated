import {
	Box,
	Card,
	Layout,
	Link,
	List,
	Page,
	Text,
	Image,
	BlockStack,
	MediaCard,
	CalloutCard,
	TextField,
	FormLayout,
	Select,
	DatePicker,
	Checkbox,
	ChoiceList,
	Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useCallback, useState } from "react";

export default function AdditionalPage() {

	const [choiceListValue, setChoiceListValue] = useState(['hidden'])
	const [checked, setChecked] = useState(true);
	const [selected, setSelected] = useState('today');
	const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
	const [selectedDates, setSelectedDates] = useState({
		start: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
		end: new Date('Wed Feb 07 2018 00:00:00 GMT-0500 (EST)'),
	});

	const handleMonthChange = useCallback(
		(month, year) => setDate({ month, year }),
		[],
	);

	const handleSelectChange = useCallback(
		(value) => setSelected(value),
		[],
	);

	const options = [
		{ label: 'Today', value: 'today' },
		{ label: 'Yesterday', value: 'yesterday' },
		{ label: 'Last 7 days', value: 'lastWeek' },
	];

	return (
		<Page
			backAction={{ content: 'Test Embedded App - V1.0.0', url: '/app' }}
			title="Additional Page"
		>
			<TitleBar title="Additional page" />
			<Layout>
				<Layout.Section variant="fullWidth">
					<CalloutCard
						title="Testing this callout card UI created using Polaris"
						illustration="https://conativeitsolutions.com/assets/imgupload/2023-5_Conative_Logo_1.svg"
						primaryAction={{
							content: 'Customize checkout',
							url: '#',
						}}
					>
						<p>Upload your store’s logo, change colors and fonts, and more.</p>
					</CalloutCard>
				</Layout.Section>
				<Layout.Section variant="oneHalf">
					<Card>
						<Text variant="heading2xl" as="h2">
							Custom Form
						</Text>
						<FormLayout>
							<FormLayout.Group>
								<TextField label="Store name" onChange={() => { }} autoComplete="off" />
								<TextField
									type="email"
									label="Account email"
									onChange={() => { }}
									autoComplete="email"
								/>
							</FormLayout.Group>
							<FormLayout.Group>
								<Select
									label="Date range"
									options={options}
									onChange={handleSelectChange}
									value={selected}
								/>
								<Select
									label="Date range"
									options={options}
									onChange={handleSelectChange}
									value={selected}
								/>
							</FormLayout.Group>

							<ChoiceList
								title="Company name"
								choices={[
									{ label: 'Hidden', value: 'hidden' },
									{ label: 'Optional', value: 'optional' },
									{ label: 'Required', value: 'required' },
								]}
								selected={choiceListValue}
								onChange={(val) => { setChoiceListValue(val) }}
							/>

							<Checkbox
								label="Recieve email regarding further updates"
								checked={checked}
								onChange={(chk) => { setChecked(chk) }}
							/>

							{/* <DatePicker
								month={month}
								year={year}
								onChange={setSelectedDates}
								onMonthChange={handleMonthChange}
								selected={selectedDates}
							/> */}
							<Button variant="primary" size="large">Add product</Button>
						</FormLayout>
					</Card>
				</Layout.Section>
				<Layout.Section>
					<BlockStack gap="300">
						<MediaCard
							title="Connect With Us"
							primaryAction={{
								content: 'Learn about getting started',
								onAction: () => { },
							}}
							description="Discover how Shopify can power up your entrepreneurial journey."
							popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
						>
							<img
								alt=""
								width="100%"
								height="100%"
								style={{
									objectFit: 'cover',
									objectPosition: 'center',
								}}
								src="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
							/>
						</MediaCard>
					</BlockStack>
					{/* <BlockStack>
						<Card>

							<Text as="p" variant="bodyMd">
								The app template comes with an additional page which
								demonstrates how to create multiple pages within app navigation
								using{" "}
								<Link
									url="https://shopify.dev/docs/apps/tools/app-bridge"
									target="_blank"
									removeUnderline
								>
									App Bridge
								</Link>
								.
							</Text>
							<Text as="p" variant="bodyMd">
								To create your own page and have it show up in the app
								navigation, add a page inside <Code>app/routes</Code>, and a
								link to it in the <Code>&lt;NavMenu&gt;</Code> component found
								in <Code>app/routes/app.jsx</Code>.
							</Text>
						</Card>
					</BlockStack> */}
				</Layout.Section>

				<Layout.Section variant="oneThird">
					<Card>
						<BlockStack gap="200">
							<Text as="h2" variant="headingMd">
								Resources
							</Text>
							<List>
								<List.Item>
									<Link
										url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
										target="_blank"
										removeUnderline
									>
										App nav best practices
									</Link>
								</List.Item>
							</List>
						</BlockStack>
					</Card>
				</Layout.Section>

			</Layout>
		</Page>
	);
}

function Code({ children }) {
	return (
		<Box
			as="span"
			padding="025"
			paddingInlineStart="100"
			paddingInlineEnd="100"
			background="bg-surface-active"
			borderWidth="025"
			borderColor="border"
			borderRadius="100"
		>
			<code>{children}</code>
		</Box>
	);
}
