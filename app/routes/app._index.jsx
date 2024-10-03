import {  useNavigation } from "@remix-run/react";
import {AppsIcon} from '@shopify/polaris-icons';
import {
  Page,
  Layout,
  Text,
  Card,
  Button,
  BlockStack,
  Box,
  List,
  Link,
  InlineStack,
	CalloutCard,
	Tabs,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import MainFormComponent from "../components/MainFormComponent";
import ShowUsersComponent from "../components/ShowUsersComponent";
import { useCallback, useState } from "react";

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return null;
};

export default function Index() {
  const nav = useNavigation();
  const shopify = useAppBridge();
	const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    [],
  );

  const tabs = [
    {
      id: 'main-form-1',
      content: 'All',
      accessibilityLabel: 'Main Form',
      panelID: 'main-form-content-1',
    },
    {
      id: 'show-users-1',
      content: 'Show Users',
      panelID: 'show-users-content-1',
    },
  ];

  return (
    <Page>
      <TitleBar title="Rahul Form Tester">
        <button variant="primary" onClick={()=>{}}>
          Show a Toast
        </button>
      </TitleBar>
      <BlockStack gap="500">
			<Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
				{
					tabs[selected].id === "main-form-1" ? <MainFormComponent /> : <ShowUsersComponent />
				}
    	</Tabs>
      </BlockStack>
    </Page>
  );
}
