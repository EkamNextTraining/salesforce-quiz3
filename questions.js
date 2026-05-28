// =====================================================================
//  SF ADMIN QUIZ — Question Bank (80 questions)
//  10 descriptive, 5 coding, 5 MCQ randomly selected at quiz start
// =====================================================================

const ALL_QUESTIONS = {

  // ────────────────────────────────────────────────────────────────
  //  DESCRIPTIVE — 40 questions (10 will be randomly picked)
  // ────────────────────────────────────────────────────────────────
  scenario: [
    {
      type: "scenario",
      category: "Security & Access",
      scenario: "A mid-sized retail company has 500 Salesforce users. Sales reps should only see records they own. Managers should see all records in their region. Regional VPs need a full view across all regions. Sensitive pricing fields must be hidden from reps but visible to managers.",
      question: "Design the complete security model for this organisation. Explain OWD settings, role hierarchy, sharing rules, and field-level security choices.",
      placeholder: "Describe OWD settings, role hierarchy levels, sharing rules, and FLS configuration..."
    },
    {
      type: "scenario",
      category: "Data Management",
      scenario: "Your company is migrating 2 million legacy CRM records into Salesforce. The data has duplicates, missing required fields, inconsistent phone formats, and relationships that must be preserved (Accounts → Contacts → Opportunities).",
      question: "Outline your complete data migration strategy, including tools, data cleansing steps, loading order, and post-migration validation.",
      placeholder: "Describe your migration plan step by step..."
    },
    {
      type: "scenario",
      category: "Automation",
      scenario: "When a new Lead is created with 'Web' as the Lead Source, the system must: auto-assign it to the Web Leads queue, send a welcome email to the lead, create a follow-up Task for the assigned user due in 2 business days, and notify the Sales Manager via Chatter.",
      question: "Which automation tools would you use and why? Walk through the complete configuration.",
      placeholder: "Describe the automation tools and configuration steps..."
    },
    {
      type: "scenario",
      category: "Reports & Dashboards",
      scenario: "The VP of Sales wants a real-time executive dashboard showing: pipeline by stage, top 10 reps by closed revenue this quarter, win rate vs last quarter, and average deal size by product. The dashboard must refresh every hour and be accessible on mobile.",
      question: "Describe how you would build this dashboard. Include report types, groupings, chart choices, and any limitations to address.",
      placeholder: "Describe your report and dashboard configuration..."
    },
    {
      type: "scenario",
      category: "Service Cloud",
      scenario: "A support team receives 1,000 cases daily via email, web form, and phone. Cases must be auto-routed to specialised queues based on product type. High-priority customers (marked in Account record) must get SLA response within 2 hours. Agents need a 360-degree customer view.",
      question: "Design the complete Service Cloud setup to handle this. Cover case assignment, escalation rules, entitlements, and the agent console layout.",
      placeholder: "Describe your Service Cloud configuration..."
    },
    {
      type: "scenario",
      category: "Sales Cloud",
      scenario: "Your sales team wants to shorten the sales cycle by standardising the opportunity management process. Different product lines follow different stages with specific required fields at each stage. Managers want a warning before a deal moves backward in the pipeline.",
      question: "How would you implement this using Sales Processes, Opportunity Stages, Validation Rules, and Path? Explain each configuration decision.",
      placeholder: "Describe your Sales Cloud configuration..."
    },
    {
      type: "scenario",
      category: "Integration",
      scenario: "Your company's ERP system needs to sync invoice data to Salesforce every night. When an invoice is marked 'Paid' in the ERP, the related Opportunity in Salesforce must update to 'Closed Won'. Real-time sync is needed for high-value deals over $50,000.",
      question: "Design the integration architecture. Explain whether you'd use REST API, Bulk API, or middleware, and how you'd handle errors and failures.",
      placeholder: "Describe your integration design and error handling approach..."
    },
    {
      type: "scenario",
      category: "Change Management",
      scenario: "Your organisation is upgrading from Classic to Lightning Experience. 200 users are involved. Some are resistant. Custom Visualforce pages need to be assessed. Training must be rolled out across three time zones.",
      question: "Develop a Lightning migration plan covering assessment, phased rollout, user training, and measuring adoption success.",
      placeholder: "Describe your migration and change management strategy..."
    },
    {
      type: "scenario",
      category: "AppExchange & Managed Packages",
      scenario: "Your admin team wants to install a managed package from AppExchange for contract management. The package requires custom permissions, touches existing Account and Opportunity objects, and must not disrupt current workflows.",
      question: "Walk through the evaluation, installation, and post-installation configuration steps you would take. What risks would you assess?",
      placeholder: "Describe your AppExchange package evaluation and deployment process..."
    },
    {
      type: "scenario",
      category: "Validation & Data Quality",
      scenario: "Sales reps are entering bad data — incorrect phone formats, empty industry fields on Accounts, and Opportunity close dates being set in the past. The data quality issues are causing CRM reporting inaccuracies.",
      question: "Design a complete data quality strategy using validation rules, duplicate rules, matching rules, and any other Salesforce-native features.",
      placeholder: "Describe your validation rules and data quality configuration..."
    },
    {
      type: "scenario",
      category: "Community / Experience Cloud",
      scenario: "A company wants to build a partner portal where channel partners can register deals, check their pipeline, submit support cases, and access marketing materials. Partners must only see their own data.",
      question: "Design the Experience Cloud implementation. Cover the template choice, sharing settings for external users, and key components to configure.",
      placeholder: "Describe your Experience Cloud portal design..."
    },
    {
      type: "scenario",
      category: "CPQ",
      scenario: "Your company sells bundled software + implementation services. Pricing has volume discounts, partner discounts (up to 20%), and special pricing that requires VP approval. Quotes must generate a branded PDF proposal automatically.",
      question: "Describe how you would configure Salesforce CPQ to handle this. Cover product bundles, price rules, approval workflows, and quote templates.",
      placeholder: "Describe your CPQ configuration approach..."
    },
    {
      type: "scenario",
      category: "Flows",
      scenario: "When a Contact's email is updated, you need to: check if the same email exists on another Contact, if duplicate found — flag the record and notify the Account owner, if no duplicate — sync the email change to the related Lead records, and log the change to a custom audit object.",
      question: "Build this logic using Flow. Describe each element you would use and how you'd handle the branching logic.",
      placeholder: "Describe your Flow design step by step..."
    },
    {
      type: "scenario",
      category: "Territory Management",
      scenario: "A company is reorganising its sales territories from region-based to industry-based. 10,000 Account records need to be reassigned. Sales reps must only see accounts in their assigned territory. Territory changes happen quarterly.",
      question: "Explain how you'd configure Enterprise Territory Management to handle this scenario and manage ongoing territory changes.",
      placeholder: "Describe your Territory Management setup..."
    },
    {
      type: "scenario",
      category: "Mobile & Offline",
      scenario: "Field service reps work in areas with no internet connectivity. They need to access customer account details, log service activities, capture signatures, and sync data when they return to connectivity.",
      question: "How would you configure Salesforce Mobile App with offline capabilities for this team? What are the limitations they need to know about?",
      placeholder: "Describe your mobile and offline configuration approach..."
    },
    {
      type: "scenario",
      category: "Forecasting",
      scenario: "The CFO wants to see a 90-day rolling revenue forecast broken down by product family, rep, and region. The sales team uses a combination of committed and pipeline deals. Forecast categories need to map to the company's finance definitions.",
      question: "Configure Collaborative Forecasting to meet these requirements. How would you map stages to forecast categories and set up hierarchy-based forecasting?",
      placeholder: "Describe your forecasting configuration..."
    },
    {
      type: "scenario",
      category: "Duplicate Management",
      scenario: "After a tradeshow, the marketing team imported 5,000 new Leads. Now the system has thousands of duplicates across Leads and Contacts. Going forward, reps must be warned before creating a duplicate and prevented from creating exact duplicates.",
      question: "Describe how you'd use Duplicate Rules and Matching Rules to handle both the existing duplicates and prevent future ones.",
      placeholder: "Describe your duplicate management strategy..."
    },
    {
      type: "scenario",
      category: "Einstein Analytics",
      scenario: "The Sales Director wants AI-powered insights embedded in the Opportunity record page showing: likelihood to close score, next best action recommendations, and a comparison of this deal against similar won deals historically.",
      question: "Describe how you would implement Einstein Opportunity Scoring, Einstein Activity Capture, and Next Best Action for this use case.",
      placeholder: "Describe your Einstein Analytics implementation plan..."
    },
    {
      type: "scenario",
      category: "Deployment & DevOps",
      scenario: "Your org has three environments: Dev, UAT, and Production. A new feature involves custom objects, flows, Apex triggers, and permission set changes. Multiple developers are working on different features simultaneously.",
      question: "Describe your deployment strategy. How would you handle the sandbox management, change sets vs SFDX vs DevOps Center, and release management?",
      placeholder: "Describe your deployment and DevOps approach..."
    },
    {
      type: "scenario",
      category: "Health Cloud / Industry",
      scenario: "A healthcare provider wants to track patient journeys, manage care plans, ensure HIPAA compliance, and allow care team collaboration — all within Salesforce. Patient data must be strictly protected.",
      question: "Describe how you would configure Salesforce Health Cloud for this use case. What compliance features, sharing models, and care plan setups would you implement?",
      placeholder: "Describe your Health Cloud configuration..."
    },
    {
      type: "scenario",
      category: "Campaign Management",
      scenario: "The marketing team runs 50+ campaigns per year across email, events, and digital channels. They need to track ROI per campaign, attribute won opportunities to campaigns, and understand which campaigns influence pipeline most.",
      question: "Design the Campaign management setup in Salesforce including Campaign Hierarchy, Campaign Influence models, and reporting strategy.",
      placeholder: "Describe your Campaign management setup..."
    },
    {
      type: "scenario",
      category: "Knowledge Management",
      scenario: "A support team wants to build a knowledge base where agents can search for articles while working on a case, articles are rated by agents and customers, and outdated articles go through an approval process before being archived.",
      question: "Configure Salesforce Knowledge for this use case. Cover data categories, article types, article lifecycle, and integration with the case object.",
      placeholder: "Describe your Knowledge configuration..."
    },
    {
      type: "scenario",
      category: "Entitlements & SLA",
      scenario: "Premium customers are entitled to 4-hour response times and 24-hour resolution. Standard customers get 24-hour response and 72-hour resolution. If milestones are breached, the case must escalate to a senior agent and the customer must be notified.",
      question: "Configure Entitlement Management to enforce these SLAs. Describe milestones, entitlement processes, and escalation actions.",
      placeholder: "Describe your Entitlement and SLA configuration..."
    },
    {
      type: "scenario",
      category: "Omni-Channel",
      scenario: "A service centre handles customer contacts via email, chat, social media, and phone. Agents have different skill sets and capacity. The routing must match the right case to the right agent based on skills and workload.",
      question: "Configure Omni-Channel routing for this team. Cover queues, routing configurations, service channels, and agent capacity.",
      placeholder: "Describe your Omni-Channel routing setup..."
    },
    {
      type: "scenario",
      category: "Permission Sets & Groups",
      scenario: "You have 10 different user types with varying object and field access. The standard profiles are too broad but creating a unique profile for each type is unmanageable. Some users temporarily need elevated access.",
      question: "Design a Permission Set architecture to handle this. When would you use Permission Set Groups vs individual sets? How would you handle temporary access?",
      placeholder: "Describe your Permission Set design..."
    },
    {
      type: "scenario",
      category: "Sandbox Strategy",
      scenario: "Development teams need isolated environments for different workstreams. QA needs a copy of production data. UAT needs to mirror production closely. Regression tests run nightly. Your org has one Full sandbox.",
      question: "Design a complete sandbox strategy for this organisation. Explain the sandbox types, refresh cycles, and how to manage the limited sandbox allocation.",
      placeholder: "Describe your sandbox strategy..."
    },
    {
      type: "scenario",
      category: "Connected App & SSO",
      scenario: "Your company uses Okta as the identity provider. Salesforce must act as a service provider. Users should log in once through Okta and access Salesforce without re-entering credentials. New hires provisioned in Okta must automatically get Salesforce access.",
      question: "Describe the SSO configuration between Okta and Salesforce. Cover SAML settings, Connected App setup, and user provisioning.",
      placeholder: "Describe your SSO and Connected App configuration..."
    },
    {
      type: "scenario",
      category: "Customer 360",
      scenario: "The company operates multiple Salesforce orgs — one for Sales, one for Service, and one for Marketing Cloud. Leadership wants a unified customer view across all three systems with data flowing in near real-time.",
      question: "How would you architect a Customer 360 solution? Discuss MuleSoft, Data Cloud, or other integration approaches and the trade-offs.",
      placeholder: "Describe your Customer 360 architecture..."
    },
    {
      type: "scenario",
      category: "Automation — Approvals",
      scenario: "Discount requests by sales reps go through a 3-level approval: Team Lead (up to 10%), Regional Manager (10-20%), VP Sales (20%+). If any approver is out of office, the request must auto-delegate. Approved discounts must update the Opportunity and notify the Finance team.",
      question: "Configure an Approval Process for this. Describe approver assignment, delegation logic, and post-approval automation.",
      placeholder: "Describe your Approval Process configuration..."
    },
    {
      type: "scenario",
      category: "Data Archiving",
      scenario: "Your org has 50 million records and is approaching storage limits. Case records older than 3 years must be archived but remain accessible for compliance audits. Archiving must not break existing reports or integrations.",
      question: "Design a data archiving strategy. What tools would you use? How would you maintain compliance access while freeing storage?",
      placeholder: "Describe your data archiving approach..."
    },
    {
      type: "scenario",
      category: "Accessibility & Compliance",
      scenario: "A government client requires that your Salesforce org meet WCAG 2.1 AA accessibility standards. Custom Lightning components, reports, and the partner portal all must be compliant. An audit is scheduled in 60 days.",
      question: "Describe your accessibility compliance approach. Which Salesforce-native features help? What custom component changes are needed?",
      placeholder: "Describe your accessibility compliance strategy..."
    },
    {
      type: "scenario",
      category: "Chatter & Collaboration",
      scenario: "Sales teams are siloed and not sharing deal intelligence. Leadership wants to foster collaboration using Salesforce-native tools. Deal rooms, competitive intel sharing, and manager coaching on pipeline reviews are the top priorities.",
      question: "Design a Chatter and Slack-for-Salesforce collaboration strategy. How would you drive adoption alongside the technical configuration?",
      placeholder: "Describe your collaboration strategy..."
    },
    {
      type: "scenario",
      category: "Pardot / Marketing Cloud Account Engagement",
      scenario: "The marketing team wants to nurture inbound leads with automated email drip sequences based on the lead's industry and behaviour (email opens, page visits). Hot leads scoring above 100 points must sync to Salesforce and auto-assign to a rep.",
      question: "Design the Pardot (MCAE) implementation covering scoring, grading, engagement programs, and CRM sync configuration.",
      placeholder: "Describe your Pardot/MCAE implementation..."
    },
    {
      type: "scenario",
      category: "Event-Driven Architecture",
      scenario: "When a large deal (>$500K) moves to 'Negotiation' stage, multiple downstream systems must react: Finance must create a revenue forecast entry, Legal must initiate an NDA workflow, and the executive team must receive a Slack alert — all within seconds.",
      question: "Design an event-driven solution using Platform Events or Change Data Capture. How does this differ from a polling-based integration?",
      placeholder: "Describe your event-driven architecture..."
    },
    {
      type: "scenario",
      category: "Record Types & Page Layouts",
      scenario: "Your org manages three types of Accounts: Corporate Clients, SMB Clients, and Partners. Each type has different required fields, different related lists on the page, and different Opportunity types available to them.",
      question: "How would you use Record Types, Page Layouts, and related configurations to deliver a tailored experience for each Account type?",
      placeholder: "Describe your Record Type and Page Layout design..."
    },
    {
      type: "scenario",
      category: "Reporting — Advanced",
      scenario: "Finance needs a cross-object report showing Accounts with their total Opportunity revenue, number of Cases raised, and last Activity date — all on one row. The data must be exportable to Excel weekly without manual effort.",
      question: "Describe how you'd build this report including report type selection, cross-object field access, and the scheduling/export automation.",
      placeholder: "Describe your advanced reporting solution..."
    },
    {
      type: "scenario",
      category: "LWC & Admin Collaboration",
      scenario: "A developer built a custom Lightning Web Component for the Opportunity page, but it breaks when the user doesn't have read access to a related custom object. The admin must add it to the correct page layouts without causing errors for restricted users.",
      question: "How would you troubleshoot and resolve this? Describe the admin-developer collaboration approach and permission fixes needed.",
      placeholder: "Describe your troubleshooting and resolution steps..."
    },
    {
      type: "scenario",
      category: "Governance & Centre of Excellence",
      scenario: "Your company has 15 Salesforce administrators across 3 business units, each making changes independently. This is causing conflicts, broken automations, and uncontrolled technical debt.",
      question: "Design a Salesforce Centre of Excellence (CoE) model. Cover governance structure, change management process, naming conventions, and a technical debt reduction plan.",
      placeholder: "Describe your CoE and governance model..."
    },
    {
      type: "scenario",
      category: "Einstein Bots",
      scenario: "The support team wants an AI chatbot on the customer portal that can answer FAQs, look up order status from an external system, and escalate complex issues to a live agent with full conversation context transferred.",
      question: "Design the Einstein Bot implementation. Cover intent configuration, external API callout handling, and agent handoff setup.",
      placeholder: "Describe your Einstein Bot design..."
    },
    {
      type: "scenario",
      category: "Order Management",
      scenario: "A manufacturing company wants to manage the full order lifecycle in Salesforce: quote → order → fulfilment → invoice → payment. Each stage has different teams, approval requirements, and status notifications.",
      question: "How would you configure Salesforce Order Management or a custom order tracking solution to handle this end-to-end process?",
      placeholder: "Describe your order management configuration..."
    }
  ],

  // ────────────────────────────────────────────────────────────────
  //  CODING — 20 questions (5 will be randomly picked)
  // ────────────────────────────────────────────────────────────────
  coding: [
    {
      type: "coding",
      category: "Apex — Triggers",
      language: "Apex",
      scenario: "When an Opportunity is marked Closed Won, automatically create a follow-up Task assigned to the Opportunity Owner due 7 days from today.",
      question: "Write a bulkified Apex trigger on the Opportunity object to handle this requirement.",
      placeholder: "trigger OpportunityTrigger on Opportunity (after update) {\n  // Your code here\n}",
      codeHint: "Use a trigger handler pattern. Collect eligible Opportunity IDs in a list, then insert Tasks in bulk outside the loop."
    },
    {
      type: "coding",
      category: "SOQL",
      language: "SOQL",
      scenario: "You need to find all Accounts that have at least one Closed Won Opportunity in the current fiscal year with a total value greater than $100,000. Return the Account Name, total won revenue, and the number of won deals.",
      question: "Write the SOQL query with aggregate functions to return this data.",
      placeholder: "SELECT Account.Name, ...\nFROM Opportunity\nWHERE ...\nGROUP BY ...",
      codeHint: "Use SUM() and COUNT() with GROUP BY. Filter on StageName and CloseDate range."
    },
    {
      type: "coding",
      category: "Apex — Batch",
      language: "Apex",
      scenario: "Every night, you need to update a custom field 'Days_Since_Last_Activity__c' on all Account records based on the most recent Activity date. The org has 500,000 Account records.",
      question: "Write a Batch Apex class to perform this update efficiently.",
      placeholder: "global class UpdateAccountActivity implements Database.Batchable<SObject> {\n  // Your code here\n}",
      codeHint: "Implement start(), execute(), and finish() methods. Use a sub-query or aggregate query to get max ActivityDate per Account."
    },
    {
      type: "coding",
      category: "LWC — JavaScript",
      language: "LWC JS",
      scenario: "You need a Lightning Web Component that displays a picklist of Account record types and filters a list of Accounts dynamically as the user selects a type. The component uses wire service to fetch accounts.",
      question: "Write the JavaScript controller for this LWC. Include the wire adapter, filtering logic, and change handler.",
      placeholder: "import { LightningElement, wire, track } from 'lwc';\nimport getAccounts from '@salesforce/apex/AccountController.getAccounts';\n\nexport default class AccountFilter extends LightningElement {\n  // Your code here\n}",
      codeHint: "Use @wire to fetch all accounts, @track for filtered list. Handle onchange event on the combobox to filter the wiredAccounts.data array."
    },
    {
      type: "coding",
      category: "Apex — REST API",
      language: "Apex",
      scenario: "An external system needs to create a Contact in Salesforce by calling a custom REST endpoint. The endpoint accepts JSON with firstName, lastName, email, and accountName. If the Account doesn't exist, it must be created first.",
      question: "Write the Apex REST resource class to handle this POST request.",
      placeholder: "@RestResource(urlMapping='/contacts/*')\nglobal class ContactApiService {\n  // Your code here\n}",
      codeHint: "Use @HttpPost method. Query for existing Account by name, insert if missing, then insert Contact linked to the Account. Return a JSON response with the Contact Id."
    },
    {
      type: "coding",
      category: "SOQL — Complex",
      language: "SOQL",
      scenario: "Find all Contacts who are primary contacts on Accounts in the 'Technology' industry, have not had any activity (Task or Event) in the last 90 days, and whose related Account has an annual revenue over $1M.",
      question: "Write the SOQL query. Consider governor limits in your approach.",
      placeholder: "SELECT Id, Name, Email, Account.Name\nFROM Contact\nWHERE ...",
      codeHint: "Use nested relationship queries or separate queries with IN clause. Consider using NOT IN with a subquery on ActivityDate."
    },
    {
      type: "coding",
      category: "Apex — Queueable",
      language: "Apex",
      scenario: "After a large data import, you need to send a personalised email to each Contact in a list of 10,000 records. The emails must use a custom email template and sending must not block the importing transaction.",
      question: "Write a Queueable Apex class that chains itself to process contacts in batches of 100 and send emails.",
      placeholder: "public class ContactEmailQueueable implements Queueable {\n  private List<Id> contactIds;\n  private Integer offset;\n  // Your code here\n}",
      codeHint: "Store the full ID list and an offset. In execute(), process IDs from offset to offset+100, send emails using Messaging.sendEmail(), then enqueue itself with the updated offset if records remain."
    },
    {
      type: "coding",
      category: "LWC — HTML Template",
      language: "LWC HTML",
      scenario: "Build a Lightning Web Component HTML template that shows a list of opportunities. Each row displays the Name, Stage, Close Date, and Amount. If the stage is 'Closed Won', the row should show a green background. If 'Closed Lost', show red.",
      question: "Write the LWC HTML template with proper conditional styling.",
      placeholder: "<template>\n  <!-- Your template code here -->\n</template>",
      codeHint: "Use template:for:each to iterate. Use a getter in JS to compute a CSS class string per row based on the StageName. Apply the class to a div wrapping each row."
    },
    {
      type: "coding",
      category: "Apex — Test Class",
      language: "Apex",
      scenario: "You need to write a test class for an Apex trigger that creates a Task when an Opportunity moves to 'Closed Won'. The test must cover both positive (stage changes to Closed Won) and negative (stage changes to something else) scenarios.",
      question: "Write the complete Apex test class with both test methods and proper test data setup.",
      placeholder: "@isTest\nprivate class OpportunityTriggerTest {\n  // Your code here\n}",
      codeHint: "Use Test.startTest() / stopTest(). Create a test Account and Opportunity. Assert that a Task is created only in the positive scenario using a SOQL query inside the test."
    },
    {
      type: "coding",
      category: "Flow — Invocable Apex",
      language: "Apex",
      scenario: "A Flow needs to call an external weather API and return the current weather for an Account's billing city. The result must be returned to the Flow as a string to display on the record page.",
      question: "Write an Invocable Apex method that the Flow can call, making an HTTP callout and returning the weather string.",
      placeholder: "public class WeatherService {\n  @InvocableMethod(label='Get Weather for City')\n  public static List<String> getWeather(List<String> cities) {\n    // Your code here\n  }\n}",
      codeHint: "Use HttpRequest/HttpResponse in the method. Remember to add the endpoint in Remote Site Settings. The method must take a List and return a List for Flow compatibility."
    },
    {
      type: "coding",
      category: "Apex — Trigger Handler Pattern",
      language: "Apex",
      scenario: "Your org has multiple triggers on the Contact object that are causing execution order conflicts. You need to refactor them into a single trigger with a handler class following the separation of concerns principle.",
      question: "Write the refactored Contact trigger and its handler class structure, demonstrating the pattern.",
      placeholder: "trigger ContactTrigger on Contact (before insert, before update, after insert, after update) {\n  // Your code here\n}\n\npublic class ContactTriggerHandler {\n  // Handler methods\n}",
      codeHint: "The trigger should only call the handler. The handler has methods like handleBeforeInsert(), handleAfterUpdate() etc. Use a TriggerContext or check Trigger.isBefore/isAfter inside the handler."
    },
    {
      type: "coding",
      category: "SOQL — Aggregates",
      language: "SOQL",
      scenario: "The sales team needs a report query showing: for each Account, the total number of open opportunities, total pipeline value, and the average deal size — but only for Accounts with more than 3 open opportunities.",
      question: "Write the SOQL aggregate query with HAVING clause to produce this result.",
      placeholder: "SELECT AccountId, Account.Name, ...\nFROM Opportunity\nWHERE ...\nGROUP BY ...\nHAVING ...",
      codeHint: "Use COUNT(Id), SUM(Amount), AVG(Amount) with GROUP BY AccountId, Account.Name. Add HAVING COUNT(Id) > 3. Filter on IsClosed = false."
    },
    {
      type: "coding",
      category: "LWC — Wire with Apex",
      language: "LWC JS",
      scenario: "Build a component that displays the top 5 opportunities by amount for the currently viewed Account. The data should load automatically when the component mounts on the Account record page and refresh when the user clicks a button.",
      question: "Write the LWC JavaScript to wire an Apex method for the record page, with manual refresh capability.",
      placeholder: "import { LightningElement, api, wire } from 'lwc';\nimport { refreshApex } from '@salesforce/apex';\nimport getTopOpps from '@salesforce/apex/OppController.getTopOpportunities';\n\nexport default class TopOpps extends LightningElement {\n  // Your code here\n}",
      codeHint: "Use @api recordId to get the current Account Id. Wire getTopOpps with recordId as parameter. Store the wired result in a variable and call refreshApex() in the button handler."
    },
    {
      type: "coding",
      category: "Apex — Scheduled",
      language: "Apex",
      scenario: "You need to automatically deactivate user accounts of employees who have been marked as 'Inactive' in a custom HR system field on the User object for more than 30 days. This job must run every Sunday at midnight.",
      question: "Write the Schedulable Apex class and the cron expression to schedule it.",
      placeholder: "global class DeactivateInactiveUsers implements Schedulable {\n  global void execute(SchedulableContext sc) {\n    // Your code here\n  }\n}",
      codeHint: "Query Users where HR_Status__c = 'Inactive' and HR_Inactive_Date__c <= 30 days ago and IsActive = true. Update IsActive = false in bulk. Cron: '0 0 0 ? * SUN *'"
    },
    {
      type: "coding",
      category: "Apex — Exception Handling",
      language: "Apex",
      scenario: "You have an Apex method that performs a DML operation on multiple records. If one record fails validation, the entire operation should not roll back — instead, failed records should be logged to a custom Error_Log__c object and successful ones committed.",
      question: "Write the Apex method using Database.insert with allOrNone=false and proper error logging.",
      placeholder: "public class BulkInsertService {\n  public static void insertWithLogging(List<SObject> records) {\n    // Your code here\n  }\n}",
      codeHint: "Use Database.insert(records, false) which returns List<Database.SaveResult>. Iterate results, check isSuccess(). For failures, build Error_Log__c records with the error message and failed record details, then insert the logs."
    },
    {
      type: "coding",
      category: "SOSL",
      language: "SOSL",
      scenario: "A global search feature needs to find records matching a user's search term across Accounts, Contacts, and Leads. Results should return Id, Name, and Email (where applicable). Limit to 20 results per object.",
      question: "Write the SOSL query to implement this cross-object search.",
      placeholder: "FIND :searchTerm IN ALL FIELDS\nRETURNING ...",
      codeHint: "Use FIND {searchTerm} IN ALL FIELDS RETURNING Account(Id, Name LIMIT 20), Contact(Id, Name, Email LIMIT 20), Lead(Id, Name, Email LIMIT 20)."
    },
    {
      type: "coding",
      category: "Apex — Future Method",
      language: "Apex",
      scenario: "When an Account's billing address is updated, you need to call an external geocoding API to get the latitude and longitude, then store them in custom fields. This must not slow down the user's save action.",
      question: "Write the @future(callout=true) Apex method to handle this asynchronous callout and field update.",
      placeholder: "public class GeocodingService {\n  @future(callout=true)\n  public static void updateGeocoordinates(Id accountId, String address) {\n    // Your code here\n  }\n}",
      codeHint: "Make an HttpRequest to the geocoding endpoint with the address. Parse the JSON response to extract lat/lng. Query the Account by Id, update custom geo fields, then DML update."
    },
    {
      type: "coding",
      category: "LWC — Custom Event",
      language: "LWC JS",
      scenario: "A child LWC component lets the user select a product from a list. When selected, the parent component must receive the product Id and name, and update a summary section. No Apex call is needed for the event itself.",
      question: "Write the child component's JS to fire a custom event and the parent component's JS to handle it.",
      placeholder: "// Child Component\nexport default class ProductPicker extends LightningElement {\n  handleSelect(event) {\n    // Fire custom event here\n  }\n}\n\n// Parent Component\nexport default class OrderSummary extends LightningElement {\n  handleProductSelected(event) {\n    // Handle event here\n  }\n}",
      codeHint: "In child: dispatch a CustomEvent with name 'productselected' and detail: { productId, productName }. In parent template: listen with onproductselected={handleProductSelected}. In parent JS: read event.detail."
    },
    {
      type: "coding",
      category: "Apex — Governor Limits",
      language: "Apex",
      scenario: "A trigger is being called in a bulk data load of 10,000 records. It currently has SOQL queries and DML inside the for loop, causing 'Too many SOQL queries' and 'Too many DML statements' errors.",
      question: "Rewrite the problematic trigger logic in a bulkified pattern. Show the before and after code.",
      placeholder: "// BEFORE (problematic):\nfor (Opportunity opp : Trigger.new) {\n  Account acc = [SELECT Id FROM Account WHERE Id = :opp.AccountId];\n  acc.Last_Opp_Date__c = opp.CloseDate;\n  update acc;\n}\n\n// AFTER (bulkified):\n// Your code here",
      codeHint: "Collect all AccountIds into a Set. Query Accounts in bulk using WHERE Id IN :accountIdSet. Build a Map<Id, Account>. Loop through opps, update from map. DML update once outside loop."
    },
    {
      type: "coding",
      category: "Apex — Custom Metadata",
      language: "Apex",
      scenario: "Your organisation's business rules (e.g., maximum discount percentages by product family) are stored in Custom Metadata Types. An Apex class must read these rules at runtime to validate discount requests without needing code deployment when rules change.",
      question: "Write the Apex class that queries Custom Metadata Type records and applies the discount validation logic.",
      placeholder: "public class DiscountValidator {\n  public static Boolean isDiscountValid(String productFamily, Decimal discountPct) {\n    // Your code here\n  }\n}",
      codeHint: "Use SELECT MasterLabel, Max_Discount__c FROM Discount_Rule__mdt WHERE Product_Family__c = :productFamily. Custom Metadata queries do NOT count against SOQL governor limits."
    }
  ],

  // ────────────────────────────────────────────────────────────────
  //  MCQ — 20 questions (5 will be randomly picked)
  // ────────────────────────────────────────────────────────────────
  mcq: [
    {
      type: "mcq",
      category: "Security",
      scenario: "An administrator needs to share specific Account records with a group of users who are not in the Account owner's role hierarchy. OWD for Account is set to Private.",
      question: "Which feature should the administrator use?",
      options: ["Role Hierarchy", "Criteria-Based Sharing Rules", "Permission Sets", "Manual Sharing"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Automation",
      scenario: "A business process requires sending an email when an Opportunity Amount exceeds $1M and the stage changes to 'Proposal'. No custom code should be written.",
      question: "Which tool is best suited for this requirement?",
      options: ["Workflow Rule with Email Alert", "Process Builder", "Flow — Record-Triggered with Email Action", "Apex Trigger with @future"],
      answer: 2
    },
    {
      type: "mcq",
      category: "Data Management",
      scenario: "You need to import 500,000 Account records along with their related Contacts into Salesforce. The import must maintain the parent-child relationship.",
      question: "Which tool handles this import most efficiently?",
      options: ["Data Import Wizard", "Data Loader", "Workbench", "Bulk API directly"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Reports",
      scenario: "A sales manager wants to see Opportunities grouped by Account with subtotals for Amount at each Account level.",
      question: "Which report type should be used?",
      options: ["Tabular Report", "Summary Report", "Matrix Report", "Joined Report"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Service Cloud",
      scenario: "Cases must be automatically assigned to different queues based on the Case Origin (Email, Phone, Web) as soon as they are created.",
      question: "What is the correct tool to configure this?",
      options: ["Assignment Rules", "Escalation Rules", "Auto-Response Rules", "Omni-Channel Routing"],
      answer: 0
    },
    {
      type: "mcq",
      category: "Object Relationships",
      scenario: "You need a custom object 'Invoice' that is strongly tied to an Account. Deleting the Account must also delete all related Invoices. The Invoice should inherit the Account's sharing settings.",
      question: "Which relationship type should you use?",
      options: ["Lookup Relationship", "Master-Detail Relationship", "Many-to-Many (Junction Object)", "External Lookup"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Governor Limits",
      scenario: "An Apex class performs 200 SOQL queries in a single transaction context.",
      question: "What will happen when the code executes?",
      options: ["It completes successfully as 200 is within limits", "It throws a LimitException and rolls back the transaction", "It queues the additional queries for later execution", "It sends an email alert to the admin and continues"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Profiles & Permissions",
      scenario: "A user needs access to a specific custom object but their Profile does not grant it. The admin wants to grant access without changing the user's Profile.",
      question: "What is the most appropriate solution?",
      options: ["Create a new Profile with the required access", "Use a Permission Set to grant object access", "Use a Sharing Rule to grant access", "Change the OWD for the object to Public Read/Write"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Validation Rules",
      scenario: "An Opportunity's Close Date must always be in the future when the Stage is set to any open stage. The rule should not fire when the record is being closed.",
      question: "Which formula correctly captures this condition in a Validation Rule?",
      options: [
        "CloseDate < TODAY()",
        "AND(NOT(ISPICKVAL(StageName,'Closed Won')), NOT(ISPICKVAL(StageName,'Closed Lost')), CloseDate < TODAY())",
        "OR(CloseDate < TODAY(), ISPICKVAL(StageName,'Closed Won'))",
        "CloseDate <= TODAY() && StageName != 'Closed Won'"
      ],
      answer: 1
    },
    {
      type: "mcq",
      category: "Deployment",
      scenario: "An admin made configuration changes in a sandbox and needs to deploy them to production. The changes include custom fields, page layouts, and a Flow.",
      question: "What is the recommended deployment method for this?",
      options: ["Manually recreate changes in production", "Use Change Sets", "Use Data Loader to transfer metadata", "Export/import using Workbench"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Apex — Concepts",
      scenario: "A developer needs to run a complex data processing job that involves updating 1 million records without hitting governor limits.",
      question: "Which Apex feature is designed for this use case?",
      options: ["@future methods", "Queueable Apex", "Batch Apex", "Platform Events"],
      answer: 2
    },
    {
      type: "mcq",
      category: "Flows",
      scenario: "A Flow needs to look up an Account record, and if it doesn't exist, create a new one, otherwise update the existing record — all in one Flow.",
      question: "Which Flow elements would handle this logic?",
      options: [
        "Get Records → Decision → Create Records or Update Records",
        "Loop → Assignment → Create Records",
        "Subflow → Get Records → Update Records",
        "Assignment → Get Records → Create Records"
      ],
      answer: 0
    },
    {
      type: "mcq",
      category: "Salesforce Platform",
      scenario: "A company needs to store 500GB of files (PDFs, images) uploaded by customers through an Experience Cloud portal.",
      question: "Which Salesforce storage option is most cost-effective for large binary files?",
      options: ["Salesforce Files storage", "Chatter Files", "Salesforce CRM Content", "Files stored as Attachments on records"],
      answer: 0
    },
    {
      type: "mcq",
      category: "Reports & Dashboards",
      scenario: "A dashboard component must always show data as of the last time the dashboard was refreshed, regardless of who is viewing it.",
      question: "Which dashboard running user setting achieves this?",
      options: ["Run as logged-in user", "Run as specified user", "Run as dashboard owner", "Dynamic Dashboard"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Data Quality",
      scenario: "The admin wants to prevent users from creating a new Contact if another Contact with the same email address already exists in the system. A warning is acceptable, but a hard block is preferred.",
      question: "Which Salesforce feature achieves the hard block?",
      options: ["Matching Rule only", "Matching Rule + Duplicate Rule set to Block", "Validation Rule checking for duplicate email", "Duplicate Rule with Alert action only"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Integration",
      scenario: "An external application needs to query Salesforce data in real time and handle responses of up to 100,000 records efficiently.",
      question: "Which Salesforce API is most appropriate?",
      options: ["SOAP API", "REST API", "Bulk API 2.0", "Streaming API"],
      answer: 2
    },
    {
      type: "mcq",
      category: "Communities / Experience Cloud",
      scenario: "External partner users in an Experience Cloud site should only see Account records that belong to their own company.",
      question: "Which feature controls this access for external users?",
      options: ["Role Hierarchy", "Account-based Sharing in Partner Communities", "OWD set to Public", "Permission Sets for External Users"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Change Data Capture",
      scenario: "A third-party system needs to be notified in near-real-time whenever a Contact record in Salesforce is updated, deleted, or undeleted — without polling.",
      question: "Which Salesforce feature enables this?",
      options: ["Outbound Messages", "Platform Events", "Change Data Capture", "Streaming API PushTopics"],
      answer: 2
    },
    {
      type: "mcq",
      category: "Einstein Features",
      scenario: "A sales manager wants Salesforce to automatically predict whether each open Opportunity is likely to close this quarter based on historical data.",
      question: "Which Einstein feature provides this capability out of the box?",
      options: ["Einstein Activity Capture", "Einstein Opportunity Scoring", "Einstein Lead Scoring", "Einstein Analytics Predictions"],
      answer: 1
    },
    {
      type: "mcq",
      category: "Sandboxes",
      scenario: "A developer needs an environment to build and test new Apex code with a small subset of production data (up to 10GB). The sandbox must be refreshable monthly.",
      question: "Which sandbox type is the right fit?",
      options: ["Developer Sandbox", "Developer Pro Sandbox", "Partial Copy Sandbox", "Full Sandbox"],
      answer: 2
    }
  ]
};

// ── Random Question Selector ────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestionSet() {
  const descriptive = shuffle(ALL_QUESTIONS.scenario).slice(0, 10);
  const coding      = shuffle(ALL_QUESTIONS.coding).slice(0, 5);
  const mcq         = shuffle(ALL_QUESTIONS.mcq).slice(0, 5);

  // Interleave: scenario, coding, MCQ distributed across 20 questions
  // Order: 4 scenario → 2 coding → 2 mcq → 3 scenario → 2 coding → 1 mcq → 3 scenario → 2 mcq → 3 scenario → 1 coding
  // Simpler: just concatenate and shuffle lightly to mix types
  const combined = [
    ...descriptive.slice(0, 4),
    ...coding.slice(0, 2),
    ...mcq.slice(0, 2),
    ...descriptive.slice(4, 7),
    ...coding.slice(2, 4),
    ...mcq.slice(2, 4),
    ...descriptive.slice(7, 10),
    ...coding.slice(4, 5),
    ...mcq.slice(4, 5),
  ];

  return combined;
}

// QUESTIONS is what quiz.js will use — built fresh on quiz start
let QUESTIONS = [];
