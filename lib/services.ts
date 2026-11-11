export const serviceCatalog = [
{slug:'online-sales',title:'Online Sales',short:'Digital channels. Real conversations.',summary:'E-commerce, social selling and digital lead generation.',intro:'Turn digital interest into commercial conversations. We plan, run and manage online sales activity across your website, social channels and customer touchpoints.',items:[
['E-commerce & Website Sales','Manage online sales activity, customer enquiries and the path from product interest to purchase.'],
['Social Media & WhatsApp Sales','Handle sales conversations and follow-ups through social platforms and WhatsApp.'],
['Online Lead Generation & Customer Acquisition','Research prospects, develop digital outreach and support the acquisition of new customers.'],
['Digital Sales Campaigns','Plan and deliver campaigns with a defined audience, offer and follow-up process.'],
['Online Sales Management','Coordinate channels, monitor the sales pipeline and organise daily commercial activity.'],
['Customer Care & Closing','Answer buying questions, follow up on opportunities and support customers through the final sales steps.']],deliver:'A coordinated online sales operation, from first enquiry to follow-up and closing.',tags:['E-commerce','Social selling','Lead generation','Sales management']},
{slug:'offline-sales',title:'Offline Sales',short:'Human connections. Commercial momentum.',summary:'Direct sales, field teams and business relationships.',intro:'Put your offer in front of the right people. We support and deliver direct sales activity, from telephone outreach and field sales to negotiations and channel development.',items:[
['B2B & B2C Sales','Build and manage sales activity for business customers and individual consumers.'],
['Direct & Door-to-Door Sales','Organise direct outreach and doorstep sales with an agreed offer, territory and operating process.'],
['Telesales & Field Sales','Deliver telephone prospecting, sales conversations, customer visits and field-based activity.'],
['Corporate & Retail Sales','Develop commercial relationships with corporate buyers, retailers and relevant purchasing teams.'],
['Contract Negotiation & Closing','Support commercial negotiations, clarify terms and guide opportunities towards an agreed close.'],
['Sales Partners & Reseller Networks','Identify, approach and develop suitable sales partners and resellers.']],deliver:'A practical sales programme with clear responsibilities, coordinated outreach and consistent follow-up.',tags:['B2B & B2C','Direct sales','Field teams','Reseller networks']},
{slug:'marketing-advertising',title:'Marketing & Advertising',short:'Build the message. Bring it to market.',summary:'Campaigns, brand building and creative production.',intro:'Connect your brand, message and channels. We develop marketing plans and carry them through into campaigns, content and day-to-day delivery.',items:[
['Marketing Strategy & Market Research','Understand the audience and market, define your positioning and turn priorities into a marketing plan.'],
['Digital Marketing & Social Media Management','Plan, publish and manage digital activity and social channels around your business objectives.'],
['Paid Advertising Campaigns','Plan and manage Google Ads, Facebook Ads, Instagram Ads and other suitable advertising channels.'],
['Traditional & Outdoor Advertising','Coordinate offline advertising and outdoor placements with a consistent campaign message.'],
['Graphic Design, Brand Development & Branding','Develop visual assets, brand identities and design materials that communicate your offer clearly.'],
['Content, Photography & Video Production','Create written, photographic and video content for campaigns, channels and business communications.']],deliver:'A connected marketing programme with creative production, campaign delivery and ongoing management.',tags:['Paid media','Social management','Branding','Creative production']},
{slug:'sales-support-customer-services',title:'Sales Support & Customer Services',short:'Every conversation deserves follow-through.',summary:'CRM, customer care and everyday sales operations.',intro:'Give your customers a consistent experience and your sales team the support to stay focused. We handle the daily work behind enquiries, orders and lasting customer relationships.',items:[
['Customer Care & Customer Service','Handle customer enquiries, provide information and coordinate service requests.'],
['Lead Management & CRM Administration','Maintain customer records, organise leads and keep follow-up activity visible in your CRM.'],
['Telephone, Email & WhatsApp Support','Manage customer communication across the channels your business uses.'],
['Appointment Setting & Sales Administration','Arrange meetings, coordinate calendars and support day-to-day sales administration.'],
['Order Processing & After-Sales Service','Support order administration, post-purchase communication and customer follow-up.'],
['Customer Retention & Sales Team Support','Maintain contact with existing customers and provide operational support to your sales teams.']],deliver:'An organised support function that connects customer communication, sales administration and after-sales care.',tags:['Customer care','CRM management','Appointments','After-sales']},
{slug:'business-development-consultancy',title:'Business Development & Consultancy',short:'Think ahead. Put the plan into motion.',summary:'Growth strategies, partnerships and outsourced teams.',intro:'Combine commercial direction with the people and processes to deliver it. We support growth, market entry and partnerships, alongside recruitment, team management and outsourced operations.',items:[
['Business Growth & Expansion Strategies','Assess opportunities and develop a practical direction for growth and expansion.'],
['Sales & Marketing Consultancy','Review your approach and define actionable sales and marketing priorities.'],
['Strategic Business Partnerships','Identify potential partners and support the development of relevant commercial relationships.'],
['International Market Entry','Research new markets and coordinate the commercial steps involved in entering them.'],
['Sales Partner Acquisition','Identify and approach potential distribution and sales partners for your business.'],
['Sales Team Recruitment & Management','Support recruitment, coordination and ongoing management of sales teams.'],
['Outsourced Sales & Marketing Departments','Take on the agreed responsibilities of a complete sales or marketing function, including operational delivery and management.']],deliver:'A practical growth plan supported by partnership development, team coordination and agreed operational delivery.',tags:['Growth strategy','Market entry','Partnerships','Team management']}
];
export const collaborationModels=[
{slug:'individual',title:'Individual Services',label:'One focused brief.',description:'Specialist delivery for a specific task, campaign or project.',examples:'Lead generation, social media marketing, direct sales or creative production.',scope:'A defined scope, clear deliverables and an agreed timeline.'},
{slug:'monthly',title:'Monthly Management',label:'Consistent, ongoing support.',description:'Ongoing management of your sales, marketing, advertising or customer service activities.',examples:'A recurring programme with agreed responsibilities and a monthly management fee.',scope:'Regular coordination, delivery and progress reviews.'},
{slug:'outsourced',title:'Outsourced Departments',label:'An extension of your business.',description:'A complete sales, marketing or customer service function, operated and managed on your behalf.',examples:'A coordinated team, daily execution and an agreed reporting structure.',scope:'Defined ownership, operational processes and ongoing oversight.'}
];
export const canonicalPages=['','about','services',...serviceCatalog.map(s=>`services/${s.slug}`),'how-we-work','industries','insights','contact','privacy-policy'];
export const legacyServiceMap: Record<string,string>={'sales-strategy':'offline-sales','lead-generation':'online-sales','market-expansion':'business-development-consultancy','business-development':'business-development-consultancy','business-intelligence':'business-development-consultancy'};
export function canonicalPage(page:string){if(page==='expertise')return 'services';if(page==='our-approach')return 'how-we-work';if(page.startsWith('expertise/'))return `services/${legacyServiceMap[page.split('/')[1]]||'business-development-consultancy'}`;return page;}
