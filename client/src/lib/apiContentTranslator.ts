// Comprehensive API Content Translator
// Translates API responses based on current language

type Language = 'en' | 'ar';

// Comprehensive translation map for all API content
const translationMap: Record<string, string> = {
  // FAQ Page
  'Frequently Asked Questions': 'الأسئلة الشائعة',
  'Find answers to common questions about Nafeza platform and services': 'ابحث عن إجابات للأسئلة الشائعة حول منصة نافذة وخدماتها',
  'Browse through our frequently asked questions to find quick answers about registration, ACI filing, e-signatures, payments, and more. If you can\'t find what you\'re looking for, please contact our support team.': 'تصفح الأسئلة الشائعة للعثور على إجابات سريعة حول التسجيل وتقديم ACI والتوقيعات الإلكترونية والمدفوعات والمزيد. إذا لم تجد ما تبحث عنه، يرجى الاتصال بفريق الدعم.',
  'All': 'الكل',
  'Broker Services': 'خدمات الوسطاء',
  'Documentation': 'التوثيق',
  'Payment': 'الدفع',
  'Status Tracking': 'تتبع الحالة',
  'Technical Support': 'الدعم الفني',
  'Account Management': 'إدارة الحساب',
  'Compliance': 'الامتثال',
  'Logistics Centers': 'مراكز الخدمات اللوجستية',
  
  // FAQ Questions and Answers
  'Who is responsible for registering on Nafeza?': 'من المسؤول عن التسجيل في نافذة؟',
  'All parties involved in foreign trade operations must register on Nafeza, including importers, exporters, customs brokers, shipping agents, and freight forwarders. Each entity must create their own account and complete the registration process with the required documentation.': 'يجب على جميع الأطراف المشاركة في عمليات التجارة الخارجية التسجيل في نافذة، بما في ذلك المستوردين والمصدرين ووسطاء الجمارك ووكلاء الشحن وشركات الشحن. يجب على كل كيان إنشاء حسابه الخاص وإكمال عملية التسجيل بالمستندات المطلوبة.',
  'How can I register on the Nafeza platform?': 'كيف يمكنني التسجيل في منصة نافذة؟',
  'To register on Nafeza, visit the registration page and click \'Register\'. You will need to provide your company information, contact details, and upload required documents such as commercial registration, tax card, and authorized signatory documents. After submission, your account will be reviewed and activated within 2-3 business days.': 'لتسجيل في نافذة، قم بزيارة صفحة التسجيل وانقر على "التسجيل". ستحتاج إلى تقديم معلومات شركتك وتفاصيل الاتصال وتحميل المستندات المطلوبة مثل السجل التجاري وبطاقة الضرائب ومستندات الموقعين المعتمدين. بعد التقديم، سيتم مراجعة حسابك وتفعيله خلال 2-3 أيام عمل.',
  'What is Advance Cargo Information (ACI) and why is it required?': 'ما هي معلومات الشحن المسبق (ACI) ولماذا هي مطلوبة؟',
  'Advance Cargo Information (ACI) is a mandatory requirement that requires exporters to submit cargo information at least 48 hours before shipping. This allows Egyptian customs and relevant authorities to review and pre-approve shipments, reducing clearance time and ensuring compliance with regulations.': 'معلومات الشحن المسبق (ACI) هي متطلب إلزامي يتطلب من المصدرين تقديم معلومات الشحن قبل 48 ساعة على الأقل من الشحن. يسمح هذا للجمارك المصرية والسلطات ذات الصلة بمراجعة والموافقة المسبقة على الشحنات، مما يقلل وقت الإفراج ويضمن الامتثال للوائح.',
  'How can a shipping agent get an ACID for the shipment and how can it verify its validity?': 'كيف يمكن لوكيل الشحن الحصول على ACID للشحنة وكيف يمكنه التحقق من صحتها؟',
  'Shipping agents can obtain an ACID (Advance Cargo Information Document) by submitting the required cargo information through the Nafeza platform. The ACID is generated automatically after successful submission and validation. You can verify the ACID validity by using the \'Validate ACID\' feature on the Nafeza homepage, entering the ACID number to check its status and authenticity.': 'يمكن لوكلاء الشحن الحصول على ACID (مستند معلومات الشحن المسبق) من خلال تقديم معلومات الشحن المطلوبة عبر منصة نافذة. يتم إنشاء ACID تلقائياً بعد التقديم والتحقق بنجاح. يمكنك التحقق من صحة ACID باستخدام ميزة "التحقق من ACID" على الصفحة الرئيسية لنافذة، وإدخال رقم ACID للتحقق من حالته وأصالته.',
  'How can the foreign exporter register on Block Chain Cargox platform, and what is the number of registrations allowed?': 'كيف يمكن للمصدر الأجنبي التسجيل في منصة البلوك تشين Cargox، وما هو عدد التسجيلات المسموح بها؟',
  'Foreign exporters can register on the CargoX blockchain platform by visiting the CargoX website and completing the registration process. Each exporter can create one main account, and there is no limit on the number of shipments that can be processed through a single account. However, each exporter should maintain only one active account to ensure proper tracking and compliance.': 'يمكن للمصدرين الأجانب التسجيل في منصة البلوك تشين CargoX من خلال زيارة موقع CargoX وإكمال عملية التسجيل. يمكن لكل مصدر إنشاء حساب رئيسي واحد، ولا يوجد حد لعدد الشحنات التي يمكن معالجتها من خلال حساب واحد. ومع ذلك، يجب على كل مصدر الحفاظ على حساب نشط واحد فقط لضمان التتبع والامتثال المناسبين.',
  'Where can I get the e-Token and the names of the companies that deal with it?': 'أين يمكنني الحصول على التوكن الإلكتروني وأسماء الشركات التي تتعامل معه؟',
  'e-Tokens (USB tokens) can be obtained from authorized certification service providers in Egypt. These providers are licensed by the Egyptian National Telecommunications Regulatory Authority (NTRA). You can find a list of authorized providers on the NTRA website or contact Nafeza support for assistance. The e-Token is required for digitally signing customs declarations and other official documents on the platform.': 'يمكن الحصول على التوكنات الإلكترونية (USB tokens) من مزودي خدمات الشهادات المعتمدين في مصر. هؤلاء المزودون مرخصون من قبل الهيئة الوطنية لتنظيم الاتصالات المصرية (NTRA). يمكنك العثور على قائمة بالمزودين المعتمدين على موقع NTRA أو الاتصال بدعم نافذة للحصول على المساعدة. التوكن الإلكتروني مطلوب للتوقيع الرقمي على الإقرارات الجمركية والمستندات الرسمية الأخرى على المنصة.',
  'Can the broker add data for the stakeholder?': 'هل يمكن للوسيط إضافة بيانات لأصحاب المصلحة؟',
  'Yes, customs brokers can add and manage data on behalf of their clients (stakeholders) if they have been authorized through a proper delegation process. The stakeholder must first create an account on Nafeza and then authorize the broker through the \'Delegate Management\' section. The broker will then be able to submit declarations and manage transactions on behalf of the authorized stakeholder.': 'نعم، يمكن لوسطاء الجمارك إضافة وإدارة البيانات نيابة عن عملائهم (أصحاب المصلحة) إذا تم تفويضهم من خلال عملية تفويض مناسبة. يجب على صاحب المصلحة أولاً إنشاء حساب على نافذة ثم تفويض الوسيط من خلال قسم "إدارة التفويض". سيتمكن الوسيط بعد ذلك من تقديم الإقرارات وإدارة المعاملات نيابة عن صاحب المصلحة المفوض.',
  'What if the exporter does not submit the electronic invoice and only submits the paper invoice and the data listed by the Egyptian importer?': 'ماذا لو لم يقدم المصدر الفاتورة الإلكترونية وقدم فقط الفاتورة الورقية والبيانات المدرجة من قبل المستورد المصري؟',
  'Electronic invoices are mandatory for ACI filing. If an exporter only submits a paper invoice, the shipment will not be processed and will be rejected at the port of entry. The exporter must submit the electronic invoice through the CargoX blockchain platform, which will be automatically linked to the ACID. Paper invoices alone are not sufficient for customs clearance.': 'الفاتورات الإلكترونية إلزامية لتقديم ACI. إذا قدم المصدر فاتورة ورقية فقط، فلن يتم معالجة الشحنة وسيتم رفضها عند ميناء الدخول. يجب على المصدر تقديم الفاتورة الإلكترونية من خلال منصة البلوك تشين CargoX، والتي سيتم ربطها تلقائياً بـ ACID. الفواتير الورقية وحدها ليست كافية لإتمام الإجراءات الجمركية.',
  'How can I pay customs duties and fees on Nafeza?': 'كيف يمكنني دفع الرسوم الجمركية والرسوم على نافذة؟',
  'You can pay customs duties and fees through the integrated payment gateway on the Nafeza platform. Accepted payment methods include bank transfers, credit cards, and electronic wallets. After submitting your declaration, you will receive a payment notification with the total amount due. Payment must be completed before customs clearance can proceed.': 'يمكنك دفع الرسوم الجمركية والرسوم من خلال بوابة الدفع المتكاملة على منصة نافذة. طرق الدفع المقبولة تشمل التحويلات المصرفية وبطاقات الائتمان والمحافظ الإلكترونية. بعد تقديم إقرارك، ستحصل على إشعار دفع بالمبلغ الإجمالي المستحق. يجب إكمال الدفع قبل المتابعة مع إتمام الإجراءات الجمركية.',
  'How do I find the correct HS Code for my goods?': 'كيف أجد رمز HS الصحيح لبضاعتي؟',
  'You can use the Tariff Search feature on Nafeza to find HS codes. Simply enter a description of your goods or search by item name. The system will display matching HS codes with their descriptions, duty rates, and applicable taxes. You can also browse by chapter or use the item number search for more precise results.': 'يمكنك استخدام ميزة البحث عن التعريفة على نافذة للعثور على رموز HS. ببساطة أدخل وصفاً لبضاعتك أو ابحث بالاسم. سيعرض النظام رموز HS المطابقة مع أوصافها ومعدلات الرسوم والضرائب المطبقة. يمكنك أيضاً التصفح حسب الفصل أو استخدام البحث برقم الصنف للحصول على نتائج أكثر دقة.',
  'How can I track the status of my customs declaration?': 'كيف يمكنني تتبع حالة إقرار الجمارك الخاص بي؟',
  'You can track your declaration status in real-time through the Nafeza dashboard. After logging in, navigate to \'My Declarations\' where you will see all your submissions with their current status (Draft, Submitted, Under Review, Approved, Rejected). You can also set up email notifications to receive updates automatically.': 'يمكنك تتبع حالة إقرارك في الوقت الفعلي من خلال لوحة تحكم نافذة. بعد تسجيل الدخول، انتقل إلى "إقراراتي" حيث سترى جميع تقديماتك مع حالتها الحالية (مسودة، مقدم، قيد المراجعة، معتمد، مرفوض). يمكنك أيضاً إعداد إشعارات البريد الإلكتروني لتلقي التحديثات تلقائياً.',
  'What should I do if I encounter technical issues on the platform?': 'ماذا يجب أن أفعل إذا واجهت مشاكل تقنية على المنصة؟',
  'If you experience technical issues, first check the Help Center for common solutions. You can also contact Nafeza support through the \'Contact Support\' section, email support@nafeza.gov.eg, or call the support hotline at +20 2 2794 0000. For urgent matters, visit your nearest logistics service center for in-person assistance.': 'إذا واجهت مشاكل تقنية، تحقق أولاً من مركز المساعدة للحلول الشائعة. يمكنك أيضاً الاتصال بدعم نافذة من خلال قسم "اتصل بالدعم" أو البريد الإلكتروني support@nafeza.gov.eg أو الاتصال بخط الدعم على +20 2 2794 0000. للأمور العاجلة، قم بزيارة أقرب مركز خدمة لوجستية للحصول على المساعدة الشخصية.',
  'How do I update my company information or change authorized signatories?': 'كيف أقوم بتحديث معلومات شركتي أو تغيير الموقعين المعتمدين؟',
  'To update company information, log into your Nafeza account and navigate to \'Company Profile\'. You can update contact information, addresses, and other details. For changes to authorized signatories, you must submit a new \'Declaration and Undertaking Form\' through the platform, which will be reviewed and approved by the authorities.': 'لتحديث معلومات الشركة، قم بتسجيل الدخول إلى حساب نافذة الخاص بك وانتقل إلى "ملف الشركة". يمكنك تحديث معلومات الاتصال والعناوين وتفاصيل أخرى. لتغيير الموقعين المعتمدين، يجب عليك تقديم "نموذج الإقرار والتعهد" جديد من خلال المنصة، والذي سيتم مراجعته والموافقة عليه من قبل السلطات.',
  'What documents are required for customs clearance?': 'ما هي المستندات المطلوبة لإتمام الإجراءات الجمركية؟',
  'Required documents typically include: Commercial Invoice, Packing List, Bill of Lading or Air Waybill, Certificate of Origin (if applicable), Import License (for restricted goods), ACID (Advance Cargo Information Document), and any other documents specific to your goods category. All documents must be submitted electronically through the Nafeza platform.': 'المستندات المطلوبة عادة تشمل: الفاتورة التجارية، قائمة التعبئة، سند الشحن أو سند الشحن الجوي، شهادة المنشأ (إن وجدت)، رخصة الاستيراد (للسلع المقيدة)، ACID (مستند معلومات الشحن المسبق)، وأي مستندات أخرى خاصة بفئة بضاعتك. يجب تقديم جميع المستندات إلكترونياً من خلال منصة نافذة.',
  'Where are the Nafeza logistics service centers located?': 'أين تقع مراكز خدمات نافذة اللوجستية؟',
  'Nafeza operates logistics service centers at major ports, airports, and border crossings across Egypt, including Cairo International Airport, Port Said, Alexandria, Damietta, Suez, Ain Sokhna, and various border crossings. You can find the complete list with addresses and contact information on the Services/Logistic Centers page.': 'تعمل نافذة مراكز خدمات لوجستية في الموانئ الرئيسية والمطارات ومعابر الحدود في جميع أنحاء مصر، بما في ذلك مطار القاهرة الدولي وبورسعيد والإسكندرية ودمياط والسويس والعين السخنة ومعابر حدودية مختلفة. يمكنك العثور على القائمة الكاملة مع العناوين ومعلومات الاتصال على صفحة الخدمات/مراكز الخدمات اللوجستية.',
  
  // Media Page
  'Media Center': 'المركز الإعلامي',
  'News Page: View the latest news from the Nafeza system here': 'صفحة الأخبار: اعرض آخر الأخبار من نظام نافذة هنا',
  'Stay updated with the latest developments, announcements, and events related to the National Single Window for Foreign Trade. Our media center provides comprehensive coverage of Nafeza\'s initiatives, partnerships, and system enhancements.': 'ابق على اطلاع بآخر التطورات والإعلانات والأحداث المتعلقة بالنافذة الوطنية الموحدة للتجارة الخارجية. يوفر مركزنا الإعلامي تغطية شاملة لمبادرات نافذة وشراكاتها وتحسينات النظام.',
  'Events': 'الأحداث',
  'Announcements': 'الإعلانات',
  
  // Media Articles
  'A Discussion Session Sponsored by the Agricultural Export Council to discuss the Advance Cargo Information (ACI) system': 'جلسة نقاش برعاية المجلس التصديري للصناعات الزراعية لمناقشة نظام معلومات الشحن المسبق (ACI)',
  'The Agricultural Export Council organized a discussion session to explore the implementation and benefits of the Advance Cargo Information (ACI) system for agricultural exports, focusing on streamlining trade procedures and enhancing export efficiency.': 'نظم المجلس التصديري للصناعات الزراعية جلسة نقاش لاستكشاف تنفيذ وفوائد نظام معلومات الشحن المسبق (ACI) للصادرات الزراعية، مع التركيز على تبسيط إجراءات التجارة وتعزيز كفاءة التصدير.',
  'Logistics Working Group Roundtable: Automotive Supply Chain in Egypt: Addressing Key Challenges': 'طاولة مستديرة لمجموعة عمل اللوجستيات: سلسلة التوريد للسيارات في مصر: معالجة التحديات الرئيسية',
  'The German-Arab Chamber of Industry and Commerce, in cooperation with Nafeza, organized a roundtable discussion focusing on the automotive supply chain in Egypt and addressing key challenges facing the industry.': 'نظمت الغرفة الألمانية العربية للصناعة والتجارة، بالتعاون مع نافذة، طاولة مستديرة تركز على سلسلة التوريد للسيارات في مصر ومعالجة التحديات الرئيسية التي تواجه الصناعة.',
  'Advance Cargo Information (ACI) system for Air Shipments Workshop': 'ورشة عمل نظام معلومات الشحن المسبق (ACI) للشحنات الجوية',
  'Nafeza conducted a comprehensive workshop focusing on the ACI system specifically for air shipments, covering registration procedures, documentation requirements, and operational guidelines for airlines and freight forwarders.': 'أجرت نافذة ورشة عمل شاملة تركز على نظام ACI خصيصاً للشحنات الجوية، وتغطي إجراءات التسجيل ومتطلبات التوثيق والإرشادات التشغيلية لشركات الطيران وشركات الشحن.',
  'NAFEZA Platform Achieves 2 Million+ Trade Declarations Processed': 'منصة نافذة تحقق معالجة أكثر من مليوني إقرار تجاري',
  'The National Single Window for Foreign Trade has successfully processed over 2 million trade declarations, marking a significant milestone in Egypt\'s digital transformation journey and demonstrating the platform\'s efficiency and reliability.': 'نجحت النافذة الوطنية الموحدة للتجارة الخارجية في معالجة أكثر من مليوني إقرار تجاري، مما يمثل علامة فارقة مهمة في رحلة التحول الرقمي لمصر ويوضح كفاءة وموثوقية المنصة.',
  'New Features Added to Nafeza Platform: Enhanced Tariff Search and Real-time Tracking': 'ميزات جديدة مضافة إلى منصة نافذة: بحث محسّن عن التعريفة وتتبع في الوقت الفعلي',
  'Nafeza has introduced new features including an enhanced tariff search functionality and real-time tracking capabilities, providing users with improved tools to manage their trade operations more effectively.': 'قدمت نافذة ميزات جديدة بما في ذلك وظيفة بحث محسّنة عن التعريفة وإمكانيات تتبع في الوقت الفعلي، مما يوفر للمستخدمين أدوات محسّنة لإدارة عملياتهم التجارية بشكل أكثر فعالية.',
  'Partnership Agreement Signed Between Nafeza and Major Shipping Lines': 'اتفاقية شراكة موقعة بين نافذة وخطوط الشحن الرئيسية',
  'Nafeza has signed strategic partnership agreements with leading international shipping lines to integrate their systems with the ACI platform, facilitating smoother cargo information exchange and reducing processing times.': 'وقّعت نافذة اتفاقيات شراكة استراتيجية مع خطوط الشحن الدولية الرائدة لدمج أنظمتها مع منصة ACI، مما يسهل تبادل معلومات الشحن بسلاسة ويقلل أوقات المعالجة.',
  'Training Program Launched for Customs Brokers on ACI System': 'إطلاق برنامج تدريبي لوسطاء الجمارك حول نظام ACI',
  'A comprehensive training program has been launched to educate customs brokers on the Advance Cargo Information system, ensuring smooth adoption and compliance with new trade facilitation requirements.': 'تم إطلاق برنامج تدريبي شامل لتعليم وسطاء الجمارك حول نظام معلومات الشحن المسبق، مما يضمن اعتماداً سلساً والامتثال لمتطلبات تسهيل التجارة الجديدة.',
  'NAFEZA Mobile Application Now Available on iOS and Android': 'تطبيق نافذة المحمول متاح الآن على iOS و Android',
  'The official Nafeza mobile application is now available for download on both iOS and Android platforms, allowing users to access trade services, track declarations, and receive notifications on the go.': 'تطبيق نافذة المحمول الرسمي متاح الآن للتنزيل على منصتي iOS و Android، مما يسمح للمستخدمين بالوصول إلى الخدمات التجارية وتتبع الإقرارات وتلقي الإشعارات أثناء التنقل.',
  'Digital Transformation Initiative: Paperless Trade Procedures': 'مبادرة التحول الرقمي: إجراءات التجارة الخالية من الورق',
  'Nafeza continues to lead Egypt\'s digital transformation in foreign trade by implementing paperless procedures, reducing environmental impact and improving operational efficiency across all trade processes.': 'تواصل نافذة قيادة التحول الرقمي في مصر في التجارة الخارجية من خلال تنفيذ إجراءات خالية من الورق، مما يقلل التأثير البيئي ويحسن الكفاءة التشغيلية عبر جميع عمليات التجارة.',
  'International Recognition: Nafeza Receives Excellence Award for Trade Facilitation': 'اعتراف دولي: نافذة تحصل على جائزة التميز لتسهيل التجارة',
  'The Nafeza platform has been recognized internationally for excellence in trade facilitation, receiving an award that highlights Egypt\'s commitment to modernizing its trade infrastructure and improving business processes.': 'تم الاعتراف بمنصة نافذة دولياً للتميز في تسهيل التجارة، حيث حصلت على جائزة تسلط الضوء على التزام مصر بتحديث بنيتها التحتية التجارية وتحسين عمليات الأعمال.',
  'Workshop on e-Signature Integration with ACI System': 'ورشة عمل حول تكامل التوقيع الإلكتروني مع نظام ACI',
  'A technical workshop was conducted to demonstrate the integration of e-Signature capabilities with the ACI system, enabling secure and legally compliant digital signing of trade documents.': 'تم إجراء ورشة عمل تقنية لإظهار تكامل إمكانيات التوقيع الإلكتروني مع نظام ACI، مما يتيح التوقيع الرقمي الآمن والقانوني للمستندات التجارية.',
  'NAFEZA Annual Conference: Future of Digital Trade in Egypt': 'مؤتمر نافذة السنوي: مستقبل التجارة الرقمية في مصر',
  'The annual Nafeza conference brought together industry leaders, government officials, and trade professionals to discuss the future of digital trade in Egypt and explore opportunities for further innovation and collaboration.': 'جمع مؤتمر نافذة السنوي قادة الصناعة والمسؤولين الحكوميين والمهنيين التجاريين لمناقشة مستقبل التجارة الرقمية في مصر واستكشاف فرص المزيد من الابتكار والتعاون.',
  
  // Services Page
  'Logistics Service Centers': 'مراكز الخدمات اللوجستية',
  'Our logistics services centers are present and available all over Egypt to facilitate your work and accomplish it in a timely manner': 'مراكز خدماتنا اللوجستية موجودة ومتاحة في جميع أنحاء مصر لتسهيل عملك وإنجازه في الوقت المناسب',
  'NAFEZA operates through a comprehensive network of logistics service centers across Egypt, ensuring accessibility and support for traders nationwide. Each center provides a full range of services including ACI filing, customs clearance, document processing, and cargo inspection.': 'تعمل نافذة من خلال شبكة شاملة من مراكز الخدمات اللوجستية في جميع أنحاء مصر، مما يضمن إمكانية الوصول والدعم للتجار على مستوى البلاد. يوفر كل مركز مجموعة كاملة من الخدمات بما في ذلك تقديم ACI وإتمام الإجراءات الجمركية ومعالجة المستندات وفحص البضائع.',
  'Services Offered': 'الخدمات المقدمة',
  'Comprehensive Solutions': 'حلول شاملة',
  'Online Services': 'الخدمات عبر الإنترنت',
  'Available Anytime': 'متاحة في أي وقت',
  'Across Egypt': 'في جميع أنحاء مصر',
  'ACI Filing and Processing': 'تقديم ومعالجة ACI',
  'Customs Declaration Services': 'خدمات الإقرارات الجمركية',
  'Document Verification and Processing': 'التحقق من المستندات ومعالجتها',
  'Cargo Inspection and Clearance': 'فحص البضائع وإتمام الإجراءات',
  'Payment Processing': 'معالجة المدفوعات',
  '24/7 Online Support': 'دعم عبر الإنترنت على مدار الساعة',
  'Real-time Status Tracking': 'تتبع الحالة في الوقت الفعلي',
  'ACI Filing': 'تقديم ACI',
  'Document Processing': 'معالجة المستندات',
  'Customs Clearance': 'إتمام الإجراءات الجمركية',
  'Cargo Inspection': 'فحص البضائع',
  'Maritime Cargo Processing': 'معالجة البضائع البحرية',
  'Container Inspection': 'فحص الحاويات',
  'Document Verification': 'التحقق من المستندات',
  'Container Processing': 'معالجة الحاويات',
  'Industrial Cargo Processing': 'معالجة البضائع الصناعية',
  'Bulk Cargo Handling': 'معالجة البضائع السائبة',
  'Land Cargo Processing': 'معالجة البضائع البرية',
  'Border Inspection': 'فحص الحدود',
  'Humanitarian Aid Processing': 'معالجة المساعدات الإنسانية',
  'Petroleum Cargo Processing': 'معالجة البضائع البترولية',
  'Specialized Cargo Handling': 'معالجة البضائع المتخصصة',
  'Ferry Cargo Processing': 'معالجة بضائع العبارات',
  'Passenger Vehicle Processing': 'معالجة مركبات الركاب',
  'Mineral Export Processing': 'معالجة صادرات المعادن',
  'Tourist Cargo Processing': 'معالجة البضائع السياحية',
  'Yacht and Boat Processing': 'معالجة اليخوت والقوارب',
  
  // About Page - Additional content
  'About Nafeza': 'حول نافذة',
  'Connecting Egypt\'s Trade Ecosystem': 'ربط النظام البيئي التجاري في مصر',
  'NAFEZA is the National Single Window for Foreign Trade Facilitation in Egypt. It serves as a unified electronic platform that connects all parties involved in foreign trade operations, including importers, exporters, customs, ports, and various government agencies.': 'نافذة هي النافذة الوطنية الموحدة لتسهيل التجارة الخارجية في مصر. تعمل كمنصة إلكترونية موحدة تربط جميع الأطراف المشاركة في عمليات التجارة الخارجية، بما في ذلك المستوردين والمصدرين والجمارك والموانئ والوكالات الحكومية المختلفة.',
  'Single Window Concept': 'مفهوم النافذة الموحدة',
  'The Single Window system simplifies and accelerates foreign trade procedures by providing a one-stop-shop for all trade-related services. Through NAFEZA, businesses can submit all required documents electronically, eliminating the need for multiple visits to different government offices.': 'يُبسط نظام النافذة الموحدة ويسرع إجراءات التجارة الخارجية من خلال توفير نقطة واحدة لجميع الخدمات المتعلقة بالتجارة. من خلال نافذة، يمكن للشركات تقديم جميع المستندات المطلوبة إلكترونياً، مما يلغي الحاجة إلى زيارات متعددة لمكاتب حكومية مختلفة.',
  'Unified platform for all trade procedures': 'منصة موحدة لجميع إجراءات التجارة',
  'Reduced processing time and costs': 'تقليل وقت التجهيز والتكاليف',
  'Enhanced transparency and efficiency': 'تعزيز الشفافية والكفاءة',
  '24/7 online access to services': 'الوصول إلى الخدمات عبر الإنترنت على مدار الساعة',
  'Real-time tracking of application status': 'تتبع حالة الطلب في الوقت الفعلي',
  'Our Services': 'خدماتنا',
  'Submit Advance Cargo Information 48 hours before shipping to expedite customs clearance.': 'تقديم معلومات الشحن المسبق قبل 48 ساعة من الشحن لتسريع إتمام الإجراءات الجمركية.',
  'Check HS Codes, Customs Duties, and Taxes instantly with our comprehensive tariff database.': 'التحقق من رموز HS والرسوم الجمركية والضرائب فوراً باستخدام قاعدة بيانات التعريفة الشاملة.',
  'Sign declarations securely using your e-Token USB for legally binding digital signatures.': 'قم بتوقيع الإقرارات بأمان باستخدام USB الخاص بالتوكن الإلكتروني للتوقيعات الرقمية الملزمة قانونياً.',
  'Upload, manage, and track all your trade-related documents in one secure location.': 'قم بتحميل وإدارة وتتبع جميع مستنداتك المتعلقة بالتجارة في موقع آمن واحد.',
  'Pay customs duties, fees, and charges securely through integrated payment systems.': 'ادفع الرسوم الجمركية والرسوم والرسوم بأمان من خلال أنظمة الدفع المتكاملة.',
  'Monitor the real-time status of your declarations and applications throughout the process.': 'راقب حالة إقراراتك وطلباتك في الوقت الفعلي طوال العملية.',
  'Our Mission': 'مهمتنا',
  'To transform Egypt\'s foreign trade ecosystem by providing a seamless, transparent, and efficient digital platform that connects all stakeholders and facilitates international trade operations.': 'تحويل النظام البيئي للتجارة الخارجية في مصر من خلال توفير منصة رقمية سلسة وشفافة وفعالة تربط جميع أصحاب المصلحة وتسهل عمليات التجارة الدولية.',
  'Our Vision': 'رؤيتنا',
  'To become the leading digital trade facilitation platform in the Middle East and Africa, empowering businesses and government agencies through innovative technology and exceptional service.': 'أن نصبح المنصة الرائدة لتسهيل التجارة الرقمية في الشرق الأوسط وأفريقيا، وتمكين الشركات والوكالات الحكومية من خلال التكنولوجيا المبتكرة والخدمة الاستثنائية.',
  'Our Values': 'قيمنا',
  'Transparency': 'الشفافية',
  'Open and clear communication in all processes': 'التواصل المفتوح والواضح في جميع العمليات',
  'Efficiency': 'الكفاءة',
  'Streamlined procedures that save time and resources': 'إجراءات مبسطة توفر الوقت والموارد',
  'Security': 'الأمان',
  'Protecting data and ensuring secure transactions': 'حماية البيانات وضمان المعاملات الآمنة',
  'Innovation': 'الابتكار',
  'Continuously improving through technology and best practices': 'التحسين المستمر من خلال التكنولوجيا وأفضل الممارسات',
  'Service Excellence': 'تميز الخدمة',
  'Committed to providing exceptional user experience': 'ملتزمون بتقديم تجربة مستخدم استثنائية',
  'Platform Impact': 'تأثير المنصة',
  'Active Users': 'المستخدمون النشطون',
  'Registered businesses and traders': 'الشركات والتجار المسجلون',
  'Declarations Processed': 'الإقرارات المعالجة',
  'Annual declarations handled': 'الإقرارات السنوية المعالجة',
  'Processing Time': 'وقت المعالجة',
  'Reduction in average processing time': 'تقليل متوسط وقت المعالجة',
  'Ports Connected': 'الموانئ المتصلة',
  'Major ports and border crossings': 'الموانئ الرئيسية ومعابر الحدود',
  'Centers Network': 'شبكة المراكز',
  'NAFEZA operates through a comprehensive network of logistics service centers across Egypt, ensuring accessibility and support for traders nationwide.': 'تعمل نافذة من خلال شبكة شاملة من مراكز الخدمات اللوجستية في جميع أنحاء مصر، مما يضمن إمكانية الوصول والدعم للتجار على مستوى البلاد.',
  'Sustainable Development': 'التنمية المستدامة',
  'NAFEZA is committed to supporting Egypt\'s sustainable development goals by facilitating trade, reducing environmental impact through paperless processes, and contributing to economic growth.': 'تلتزم نافذة بدعم أهداف التنمية المستدامة في مصر من خلال تسهيل التجارة وتقليل التأثير البيئي من خلال العمليات الخالية من الورق والمساهمة في النمو الاقتصادي.',
  'Digital transformation of trade procedures': 'التحول الرقمي لإجراءات التجارة',
  'Environmental sustainability through paperless operations': 'الاستدامة البيئية من خلال العمليات الخالية من الورق',
  'Economic growth facilitation': 'تسهيل النمو الاقتصادي',
  'Compliance with international trade standards': 'الامتثال لمعايير التجارة الدولية',
  'Continuous improvement and innovation': 'التحسين المستمر والابتكار',
  'Get in Touch': 'تواصل معنا',
  
  // Location names and addresses
  'Cairo International Airport': 'مطار القاهرة الدولي',
  'Cairo, Egypt': 'القاهرة، مصر',
  'Cairo International Airport, Terminal 3': 'مطار القاهرة الدولي، المبنى 3',
  'Port Said Port': 'ميناء بورسعيد',
  'Port Said, Egypt': 'بورسعيد، مصر',
  'Port Said Port Authority, Eastern Port': 'هيئة ميناء بورسعيد، الميناء الشرقي',
  'Alexandria Port': 'ميناء الإسكندرية',
  'Alexandria, Egypt': 'الإسكندرية، مصر',
  'Alexandria Port Authority, Main Terminal': 'هيئة ميناء الإسكندرية، المحطة الرئيسية',
  'Damietta Port': 'ميناء دمياط',
  'Damietta, Egypt': 'دمياط، مصر',
  'Damietta Port Authority, Container Terminal': 'هيئة ميناء دمياط، محطة الحاويات',
  'Suez Port': 'ميناء السويس',
  'Suez, Egypt': 'السويس، مصر',
  'Suez Port Authority, Main Terminal': 'هيئة ميناء السويس، المحطة الرئيسية',
  'Ain Sokhna Port': 'ميناء العين السخنة',
  'Ain Sokhna, Suez Governorate': 'العين السخنة، محافظة السويس',
  'Ain Sokhna Port, Industrial Zone': 'ميناء العين السخنة، المنطقة الصناعية',
  'Taba Border Crossing': 'معبر طابا',
  'Taba, South Sinai': 'طابا، جنوب سيناء',
  'Taba Border Crossing, Egypt-Israel Border': 'معبر طابا، الحدود المصرية الإسرائيلية',
  'Rafah Border Crossing': 'معبر رفح',
  'Rafah, North Sinai': 'رفح، شمال سيناء',
  'Rafah Border Crossing, Egypt-Gaza Border': 'معبر رفح، الحدود المصرية الفلسطينية',
  'Salloum Border Crossing': 'معبر السلوم',
  'Salloum, Matruh Governorate': 'السلوم، محافظة مطروح',
  'Salloum Border Crossing, Egypt-Libya Border': 'معبر السلوم، الحدود المصرية الليبية',
  'Adabiya Port': 'ميناء العتبية',
  'Adabiya, Suez Governorate': 'العتبية، محافظة السويس',
  'Adabiya Port, Petroleum Terminal': 'ميناء العتبية، محطة البترول',
  'Dekheila Port': 'ميناء الدخيلة',
  'Dekheila Port, Container Terminal': 'ميناء الدخيلة، محطة الحاويات',
  'El Arish Port': 'ميناء العريش',
  'El Arish, North Sinai': 'العريش، شمال سيناء',
  'El Arish Port, Main Terminal': 'ميناء العريش، المحطة الرئيسية',
  'Nuweiba Port': 'ميناء نويبع',
  'Nuweiba, South Sinai': 'نويبع، جنوب سيناء',
  'Nuweiba Port, Ferry Terminal': 'ميناء نويبع، محطة العبارات',
  'Safaga Port': 'ميناء سفاجا',
  'Safaga, Red Sea Governorate': 'سفاجا، محافظة البحر الأحمر',
  'Safaga Port, Main Terminal': 'ميناء سفاجا، المحطة الرئيسية',
  'Hurghada Port': 'ميناء الغردقة',
  'Hurghada, Red Sea Governorate': 'الغردقة، محافظة البحر الأحمر',
  'Hurghada Port, Tourist Terminal': 'ميناء الغردقة، محطة السياح',
  
  // Working hours
  'Sunday - Thursday: 8:00 AM - 4:00 PM': 'الأحد - الخميس: 8:00 صباحاً - 4:00 مساءً',
  '24/7': '24/7',
  
  // Services page additional text
  'Click to expand details': 'انقر لتوسيع التفاصيل',
  'Click to collapse details': 'انقر لطي التفاصيل',
  
  // Media article tags
  'ACI System': 'نظام ACI',
  'Agricultural Exports': 'الصادرات الزراعية',
  'Trade Facilitation': 'تسهيل التجارة',
  'Automotive': 'السيارات',
  'Supply Chain': 'سلسلة التوريد',
  'Logistics': 'اللوجستيات',
  'Roundtable': 'طاولة مستديرة',
  'Air Shipments': 'الشحنات الجوية',
  'Workshop': 'ورشة عمل',
  'Training': 'التدريب',
  'Milestone': 'علامة فارقة',
  'Achievement': 'إنجاز',
  'Digital Transformation': 'التحول الرقمي',
  'Trade Declarations': 'الإقرارات التجارية',
  'Platform Update': 'تحديث المنصة',
  'New Features': 'ميزات جديدة',
  'Tracking': 'التتبع',
  'Partnership': 'شراكة',
  'Integration': 'التكامل',
  'Collaboration': 'التعاون',
  'Customs Brokers': 'وسطاء الجمارك',
  'Education': 'التعليم',
  'Mobile App': 'التطبيق المحمول',
  'iOS': 'iOS',
  'Android': 'Android',
  'Mobile Services': 'الخدمات المحمولة',
  'Paperless': 'خالي من الورق',
  'Sustainability': 'الاستدامة',
  'Environment': 'البيئة',
  'Award': 'جائزة',
  'Recognition': 'اعتراف',
  'Excellence': 'التميز',
  'International': 'دولي',
  'Security': 'الأمان',
  'e-Token': 'التوكن الإلكتروني',
  'Conference': 'مؤتمر',
  'Future': 'المستقبل',
  'Innovation': 'الابتكار',
  
  // Media article authors
  'Nafeza Editorial Team': 'فريق تحرير نافذة',
  'Nafeza Communications': 'اتصالات نافذة',
  'Nafeza Training Department': 'قسم التدريب بنافذة',
  'Nafeza Management': 'إدارة نافذة',
  'Nafeza Development Team': 'فريق التطوير بنافذة',
  'Nafeza Business Development': 'التنمية التجارية بنافذة',
  'Nafeza Mobile Team': 'فريق التطبيقات المحمولة بنافذة',
  'Nafeza Sustainability Team': 'فريق الاستدامة بنافذة',
  'Nafeza Technical Team': 'الفريق التقني بنافذة',
  'Nafeza Conference Team': 'فريق المؤتمر بنافذة',
  
  // Media article content - Article 1
  'As part of its ongoing support for the industrial and business community, the Agricultural Export Council organized a comprehensive discussion session to explore the Advance Cargo Information (ACI) system and its impact on agricultural exports in Egypt.': 'كجزء من دعمها المستمر للمجتمع الصناعي والتجاري، نظم المجلس التصديري للصناعات الزراعية جلسة نقاش شاملة لاستكشاف نظام معلومات الشحن المسبق (ACI) وتأثيره على الصادرات الزراعية في مصر.',
  'The session, which took place in Cairo, brought together key stakeholders from the agricultural export sector, including exporters, freight forwarders, and representatives from Nafeza, the National Single Window for Foreign Trade.': 'جمعت الجلسة، التي عقدت في القاهرة، أصحاب المصلحة الرئيسيين من قطاع التصدير الزراعي، بما في ذلك المصدرين وشركات الشحن وممثلي نافذة، النافذة الواحدة الوطنية للتجارة الخارجية.',
  'During the session, participants discussed the various benefits of the ACI system, including:': 'خلال الجلسة، ناقش المشاركون الفوائد المختلفة لنظام ACI، بما في ذلك:',
  'Streamlined customs clearance procedures': 'إجراءات الإفراج الجمركي المبسطة',
  'Reduced processing times for agricultural exports': 'تقليل أوقات المعالجة للصادرات الزراعية',
  'Enhanced transparency in trade documentation': 'تعزيز الشفافية في الوثائق التجارية',
  'Improved coordination between exporters and customs authorities': 'تحسين التنسيق بين المصدرين والسلطات الجمركية',
  'The Agricultural Export Council emphasized the importance of adopting digital solutions to enhance Egypt\'s competitiveness in international markets. The ACI system represents a significant step forward in modernizing trade procedures and facilitating smoother export operations.': 'أكد المجلس التصديري للصناعات الزراعية على أهمية تبني الحلول الرقمية لتعزيز قدرة مصر التنافسية في الأسواق الدولية. يمثل نظام ACI خطوة مهمة إلى الأمام في تحديث إجراءات التجارة وتسهيل عمليات التصدير.',
  'Participants expressed their commitment to working closely with Nafeza to ensure successful implementation of the system across all agricultural export channels. The session concluded with a Q&A segment where attendees had the opportunity to address specific concerns and receive guidance on system registration and usage.': 'أعرب المشاركون عن التزامهم بالعمل بشكل وثيق مع نافذة لضمان التنفيذ الناجح للنظام عبر جميع قنوات التصدير الزراعي. اختتمت الجلسة بجزء للأسئلة والأجوبة حيث أتيحت للمشاركين الفرصة لمعالجة مخاوف محددة والحصول على إرشادات حول تسجيل النظام واستخدامه.',
  
  // Media article content - Article 2
  'The German-Arab Chamber of Industry and Commerce, in cooperation with Nafeza, successfully organized a Logistics Working Group Roundtable on March 5, 2025, focusing on the automotive supply chain in Egypt.': 'نظمت الغرفة الألمانية العربية للصناعة والتجارة، بالتعاون مع نافذة، بنجاح طاولة مستديرة لمجموعة عمل اللوجستيات في 5 مارس 2025، مع التركيز على سلسلة التوريد للسيارات في مصر.',
  'The event brought together industry leaders, logistics experts, and government representatives to discuss critical challenges and opportunities in Egypt\'s automotive supply chain sector.': 'جمع الحدث قادة الصناعة وخبراء اللوجستيات وممثلي الحكومة لمناقشة التحديات والفرص الحرجة في قطاع سلسلة التوريد للسيارات في مصر.',
  'Key topics discussed during the roundtable included:': 'شملت الموضوعات الرئيسية التي تمت مناقشتها خلال الطاولة المستديرة:',
  'Current state of the automotive supply chain in Egypt': 'الوضع الحالي لسلسلة التوريد للسيارات في مصر',
  'Challenges in logistics and customs procedures': 'التحديات في اللوجستيات والإجراءات الجمركية',
  'Integration of ACI system with automotive supply chains': 'تكامل نظام ACI مع سلاسل التوريد للسيارات',
  'Best practices for streamlining automotive imports and exports': 'أفضل الممارسات لتبسيط استيراد وتصدير السيارات',
  'Future opportunities for growth and development': 'الفرص المستقبلية للنمو والتطوير',
  'Representatives from Nafeza presented the latest developments in the Advance Cargo Information system and how it can benefit automotive industry stakeholders. The discussion highlighted the importance of digital transformation in improving supply chain efficiency and reducing operational costs.': 'قدم ممثلو نافذة أحدث التطورات في نظام معلومات الشحن المسبق وكيف يمكن أن يستفيد أصحاب المصلحة في صناعة السيارات. سلطت المناقشة الضوء على أهمية التحول الرقمي في تحسين كفاءة سلسلة التوريد وتقليل التكاليف التشغيلية.',
  'Participants engaged in productive dialogue about potential solutions to existing challenges and explored collaborative opportunities to enhance the automotive supply chain ecosystem in Egypt. The roundtable concluded with a commitment to continued cooperation between the German-Arab Chamber, Nafeza, and industry stakeholders.': 'انخرط المشاركون في حوار مثمر حول الحلول المحتملة للتحديات الموجودة واستكشفوا فرص التعاون لتعزيز نظام سلسلة التوريد للسيارات في مصر. اختتمت الطاولة المستديرة بالتزام بالتعاون المستمر بين الغرفة الألمانية العربية ونافذة وأصحاب المصلحة في الصناعة.',
  
  // Media article content - Article 3
  'Nafeza successfully conducted a specialized workshop on the Advance Cargo Information (ACI) system for air shipments, providing detailed guidance to airlines, freight forwarders, and cargo handlers.': 'أجرت نافذة بنجاح ورشة عمل متخصصة حول نظام معلومات الشحن المسبق (ACI) للشحنات الجوية، مقدمة إرشادات مفصلة لشركات الطيران وشركات الشحن ومعالجات الشحنات.',
  'The workshop, held at Cairo International Airport, covered essential aspects of the ACI system implementation for air cargo operations, including:': 'غطت ورشة العمل، التي عقدت في مطار القاهرة الدولي، الجوانب الأساسية لتنفيذ نظام ACI لعمليات الشحن الجوي، بما في ذلك:',
  'Registration procedures for airlines and freight forwarders': 'إجراءات التسجيل لشركات الطيران وشركات الشحن',
  'Documentation requirements for air shipments': 'متطلبات الوثائق للشحنات الجوية',
  'Timeline and deadlines for ACI submission': 'الجدول الزمني والمواعيد النهائية لتقديم ACI',
  'System navigation and user interface training': 'تدريب التنقل في النظام وواجهة المستخدم',
  'Troubleshooting common issues and challenges': 'حل المشاكل الشائعة والتحديات',
  'Industry participants gained valuable insights into how the ACI system streamlines air cargo operations, reduces processing times, and enhances security measures. The workshop included hands-on training sessions where attendees practiced using the Nafeza platform for submitting advance cargo information.': 'اكتسب المشاركون في الصناعة رؤى قيمة حول كيفية تبسيط نظام ACI لعمليات الشحن الجوي وتقليل أوقات المعالجة وتعزيز إجراءات الأمان. شملت ورشة العمل جلسات تدريبية عملية حيث مارس الحضور استخدام منصة نافذة لتقديم معلومات الشحن المسبق.',
  'Representatives from major airlines and freight forwarding companies attended the event, demonstrating strong industry interest in adopting digital solutions for air cargo management. The workshop received positive feedback from participants, who appreciated the practical approach and comprehensive coverage of the topic.': 'حضر ممثلون من شركات الطيران الكبرى وشركات الشحن الحدث، مما يظهر اهتماماً قوياً من الصناعة بتبني الحلول الرقمية لإدارة الشحن الجوي. تلقت ورشة العمل ردود فعل إيجابية من المشاركين، الذين قدروا النهج العملي والتغطية الشاملة للموضوع.',
  
  // Media article content - Article 4
  'The Nafeza platform has reached a historic milestone, successfully processing over 2 million trade declarations since its launch. This achievement represents a significant step forward in Egypt\'s digital transformation journey and demonstrates the platform\'s growing adoption and effectiveness.': 'وصلت منصة نافذة إلى معلم تاريخي، حيث نجحت في معالجة أكثر من مليوني إقرار تجاري منذ إطلاقها. يمثل هذا الإنجاز خطوة مهمة إلى الأمام في رحلة التحول الرقمي لمصر ويظهر اعتماد المنصة المتزايد وفعاليتها.',
  'The milestone reflects the trust and confidence that businesses and traders have placed in the Nafeza system. The platform has revolutionized trade procedures in Egypt by:': 'يعكس هذا المعلم الثقة التي وضعتها الشركات والتجار في نظام نافذة. أحدثت المنصة ثورة في إجراءات التجارة في مصر من خلال:',
  'Reducing processing times by up to 70%': 'تقليل أوقات المعالجة بنسبة تصل إلى 70%',
  'Eliminating the need for physical document submission': 'إلغاء الحاجة لتقديم المستندات المادية',
  'Providing real-time tracking and status updates': 'توفير التتبع في الوقت الفعلي وتحديثات الحالة',
  'Enhancing transparency and reducing opportunities for errors': 'تعزيز الشفافية وتقليل فرص الأخطاء',
  'Since its implementation, Nafeza has continuously evolved to meet the changing needs of the trade community. The platform now serves over 50,000 registered businesses and traders, processing thousands of declarations daily across all major ports and border crossings in Egypt.': 'منذ تنفيذها، تطورت نافذة باستمرار لتلبية الاحتياجات المتغيرة لمجتمع التجارة. تخدم المنصة الآن أكثر من 50,000 شركة وتاجر مسجل، معالجة آلاف الإقرارات يومياً عبر جميع الموانئ الرئيسية ومعابر الحدود في مصر.',
  'This achievement would not have been possible without the collaboration and support of all stakeholders, including customs authorities, port operators, freight forwarders, and the business community. Nafeza remains committed to further improving its services and expanding its capabilities to better serve Egypt\'s foreign trade sector.': 'لم يكن هذا الإنجاز ممكناً بدون التعاون والدعم من جميع أصحاب المصلحة، بما في ذلك السلطات الجمركية ومشغلي الموانئ وشركات الشحن ومجتمع الأعمال. تظل نافذة ملتزمة بتحسين خدماتها وتوسيع قدراتها لخدمة قطاع التجارة الخارجية في مصر بشكل أفضل.',
  
  // Media article content - Article 5
  'Nafeza is pleased to announce the launch of several new features designed to enhance user experience and improve operational efficiency for traders and businesses.': 'يسر نافذة الإعلان عن إطلاق عدة ميزات جديدة مصممة لتحسين تجربة المستخدم وكفاءة العمليات للتجار والشركات.',
  'The latest platform update includes:': 'يتضمن آخر تحديث للمنصة:',
  'Enhanced Tariff Search': 'البحث المحسن عن التعريفة',
  'The new tariff search functionality provides users with more comprehensive and accurate results when searching for HS codes, customs duties, and taxes. The enhanced search includes:': 'توفر وظيفة البحث عن التعريفة الجديدة للمستخدمين نتائج أكثر شمولاً ودقة عند البحث عن رموز HS والرسوم الجمركية والضرائب. يتضمن البحث المحسن:',
  'Improved search algorithms for faster and more accurate results': 'خوارزميات بحث محسنة للحصول على نتائج أسرع وأكثر دقة',
  'Advanced filtering options by chapter, heading, and subheading': 'خيارات تصفية متقدمة حسب الفصل والعنوان والفرع',
  'Detailed tariff information with historical data': 'معلومات تعريفة مفصلة مع بيانات تاريخية',
  'Export functionality for search results': 'وظيفة التصدير لنتائج البحث',
  'Real-time Tracking': 'التتبع في الوقت الفعلي',
  'Users can now track their declarations and applications in real-time with enhanced visibility into the status of their submissions. The new tracking features include:': 'يمكن للمستخدمين الآن تتبع إقراراتهم وطلباتهم في الوقت الفعلي مع رؤية محسنة لحالة تقديماتهم. تتضمن ميزات التتبع الجديدة:',
  'Real-time status updates': 'تحديثات الحالة في الوقت الفعلي',
  'Detailed progress tracking through each stage': 'تتبع تقدم مفصل عبر كل مرحلة',
  'Automated notifications for status changes': 'إشعارات تلقائية لتغييرات الحالة',
  'Historical timeline of all actions and updates': 'الجدول الزمني التاريخي لجميع الإجراءات والتحديثات',
  'These improvements are part of Nafeza\'s ongoing commitment to providing the best possible user experience and supporting Egypt\'s trade community with cutting-edge digital solutions.': 'هذه التحسينات جزء من التزام نافذة المستمر بتقديم أفضل تجربة مستخدم ممكنة ودعم مجتمع التجارة في مصر بحلول رقمية متطورة.',
  
  // Media article content - Article 6
  'Nafeza has entered into strategic partnership agreements with several major international shipping lines, marking a significant step forward in streamlining cargo information exchange and improving trade facilitation.': 'دخلت نافذة في اتفاقيات شراكة استراتيجية مع عدة خطوط شحن دولية كبرى، مما يمثل خطوة مهمة إلى الأمام في تبسيط تبادل معلومات الشحن وتحسين تسهيل التجارة.',
  'These partnerships will enable direct system integration between shipping lines and the Nafeza platform, resulting in:': 'ستمكن هذه الشراكات من التكامل المباشر للنظام بين خطوط الشحن ومنصة نافذة، مما يؤدي إلى:',
  'Automated cargo information transfer': 'نقل معلومات الشحن التلقائي',
  'Reduced manual data entry and errors': 'تقليل إدخال البيانات اليدوي والأخطاء',
  'Faster processing times': 'أوقات معالجة أسرع',
  'Enhanced data accuracy and consistency': 'تحسين دقة البيانات واتساقها',
  'The agreements represent a collaborative effort to modernize Egypt\'s trade infrastructure and align with international best practices. Shipping lines will be able to seamlessly submit advance cargo information directly through their existing systems, eliminating the need for duplicate data entry.': 'تمثل الاتفاقيات جهداً تعاونياً لتحديث البنية التحتية التجارية لمصر والمواءمة مع أفضل الممارسات الدولية. ستتمكن خطوط الشحن من تقديم معلومات الشحن المسبق بسلاسة مباشرة من خلال أنظمتها الموجودة، مما يلغي الحاجة لإدخال البيانات المكررة.',
  'This integration will benefit all stakeholders in the trade ecosystem, from shipping lines and freight forwarders to importers and customs authorities. The partnerships demonstrate Nafeza\'s commitment to building a comprehensive digital trade ecosystem that serves all participants in the supply chain.': 'سيفيد هذا التكامل جميع أصحاب المصلحة في نظام التجارة، من خطوط الشحن وشركات الشحن إلى المستوردين والسلطات الجمركية. تظهر الشراكات التزام نافذة ببناء نظام تجاري رقمي شامل يخدم جميع المشاركين في سلسلة التوريد.',
  
  // Media article content - Article 7
  'Nafeza has launched a comprehensive training program specifically designed for customs brokers to ensure they are fully equipped to work with the Advance Cargo Information (ACI) system.': 'أطلقت نافذة برنامج تدريبي شامل مصمم خصيصاً لوسطاء الجمارك لضمان أنهم مجهزون بالكامل للعمل مع نظام معلومات الشحن المسبق (ACI).',
  'The training program covers essential topics including:': 'يغطي البرنامج التدريبي مواضيع أساسية بما في ذلك:',
  'Overview of the ACI system and its benefits': 'نظرة عامة على نظام ACI وفوائده',
  'Registration and account setup procedures': 'إجراءات التسجيل وإعداد الحساب',
  'Step-by-step guide to submitting advance cargo information': 'دليل خطوة بخطوة لتقديم معلومات الشحن المسبق',
  'Documentation requirements and best practices': 'متطلبات الوثائق وأفضل الممارسات',
  'Common issues and troubleshooting': 'المشاكل الشائعة وحلها',
  'Compliance requirements and deadlines': 'متطلبات الامتثال والمواعيد النهائية',
  'The program is being delivered through a combination of online modules and in-person workshops, ensuring that customs brokers across Egypt have access to the training they need. Participants receive certificates upon completion, recognizing their proficiency in using the ACI system.': 'يتم تقديم البرنامج من خلال مزيج من الوحدات عبر الإنترنت وورش العمل الشخصية، مما يضمن أن وسطاء الجمارك في جميع أنحاء مصر لديهم إمكانية الوصول إلى التدريب الذي يحتاجونه. يتلقى المشاركون شهادات عند الانتهاء، معترفاً بكفاءتهم في استخدام نظام ACI.',
  'This initiative reflects Nafeza\'s commitment to supporting all stakeholders in the trade ecosystem and ensuring smooth adoption of digital trade procedures. Customs brokers play a crucial role in facilitating trade, and this training program empowers them to serve their clients more effectively.': 'يعكس هذا المبادرة التزام نافذة بدعم جميع أصحاب المصلحة في نظام التجارة وضمان اعتماد سلس لإجراءات التجارة الرقمية. يلعب وسطاء الجمارك دوراً حاسماً في تسهيل التجارة، ويمنحهم هذا البرنامج التدريبي القدرة على خدمة عملائهم بشكل أكثر فعالية.',
  
  // Media article content - Article 8
  'Nafeza is excited to announce the official launch of its mobile application, now available for download on both iOS and Android platforms. The mobile app brings the power of Nafeza\'s trade facilitation services directly to users\' smartphones and tablets.': 'نافذة متحمسة للإعلان عن الإطلاق الرسمي لتطبيقها المحمول، المتاح الآن للتنزيل على منصتي iOS و Android. يجلب التطبيق المحمول قوة خدمات تسهيل التجارة لنافذة مباشرة إلى الهواتف الذكية والأجهزة اللوحية للمستخدمين.',
  'The Nafeza mobile app provides users with:': 'يوفر تطبيق نافذة المحمول للمستخدمين:',
  'Access to all platform services from mobile devices': 'الوصول إلى جميع خدمات المنصة من الأجهزة المحمولة',
  'Push notifications for important updates': 'إشعارات فورية للتحديثات المهمة',
  'Quick access to tariff search and currency rates': 'وصول سريع للبحث عن التعريفة وأسعار العملات',
  'Document upload and management capabilities': 'قدرات تحميل وإدارة المستندات',
  'Secure authentication and e-signature support': 'المصادقة الآمنة ودعم التوقيع الإلكتروني',
  'The app features an intuitive user interface designed for mobile use, ensuring that traders can manage their operations efficiently whether they\'re in the office or on the go. The application maintains the same high standards of security and data protection as the web platform.': 'يتميز التطبيق بواجهة مستخدم بديهية مصممة للاستخدام المحمول، مما يضمن أن التجار يمكنهم إدارة عملياتهم بكفاءة سواء كانوا في المكتب أو في الطريق. يحافظ التطبيق على نفس المعايير العالية للأمان وحماية البيانات مثل المنصة الإلكترونية.',
  'Available features include submitting ACI requests, tracking declaration status, searching tariffs, checking currency rates, and receiving instant notifications about important updates. The mobile app represents Nafeza\'s commitment to providing convenient and accessible trade services to all users.': 'تشمل الميزات المتاحة تقديم طلبات ACI وتتبع حالة الإقرار والبحث عن التعريفات والتحقق من أسعار العملات وتلقي إشعارات فورية حول التحديثات المهمة. يمثل التطبيق المحمول التزام نافذة بتقديم خدمات تجارية مريحة ويمكن الوصول إليها لجميع المستخدمين.',
  'Download the Nafeza app today from the App Store or Google Play and experience the convenience of managing your trade operations from anywhere, at any time.': 'قم بتنزيل تطبيق نافذة اليوم من App Store أو Google Play واستمتع براحة إدارة عمليات التجارة الخاصة بك من أي مكان وفي أي وقت.',
  
  // Media article content - Article 9
  'Nafeza is at the forefront of Egypt\'s digital transformation in foreign trade, implementing comprehensive paperless procedures that benefit both businesses and the environment.': 'نافذة في طليعة التحول الرقمي لمصر في التجارة الخارجية، تنفذ إجراءات شاملة خالية من الورق تفيد الشركات والبيئة.',
  'The shift to paperless trade procedures has resulted in significant benefits:': 'أدى التحول إلى إجراءات التجارة الخالية من الورق إلى فوائد كبيرة:',
  'Elimination of physical document submission requirements': 'إلغاء متطلبات تقديم المستندات المادية',
  'Reduced environmental impact through decreased paper usage': 'تقليل التأثير البيئي من خلال تقليل استخدام الورق',
  'Faster processing times with digital workflows': 'أوقات معالجة أسرع مع سير العمل الرقمي',
  'Enhanced security through digital document management': 'تعزيز الأمان من خلال إدارة المستندات الرقمية',
  'Improved accessibility and convenience for users': 'تحسين إمكانية الوصول والراحة للمستخدمين',
  'All trade-related documents, including declarations, certificates, and supporting documentation, can now be submitted and processed entirely through the Nafeza digital platform. This transformation has not only improved efficiency but also contributed to environmental sustainability by significantly reducing paper consumption.': 'يمكن الآن تقديم ومعالجة جميع المستندات المتعلقة بالتجارة، بما في ذلك الإقرارات والشهادات والوثائق الداعمة، بالكامل من خلال المنصة الرقمية لنافذة. لم يحسن هذا التحول الكفاءة فحسب، بل ساهم أيضاً في الاستدامة البيئية من خلال تقليل استهلاك الورق بشكل كبير.',
  'The paperless initiative aligns with global trends toward digital trade facilitation and positions Egypt as a leader in modern trade procedures. Nafeza continues to work with all stakeholders to ensure smooth transition and maximum benefit from these digital innovations.': 'تتماشى مبادرة خالية من الورق مع الاتجاهات العالمية نحو تسهيل التجارة الرقمية ووضع مصر كرائدة في إجراءات التجارة الحديثة. تواصل نافذة العمل مع جميع أصحاب المصلحة لضمان الانتقال السلس والاستفادة القصوى من هذه الابتكارات الرقمية.',
  
  // Media article content - Article 10
  'Nafeza has received international recognition for excellence in trade facilitation, winning a prestigious award that acknowledges the platform\'s significant contributions to modernizing Egypt\'s trade infrastructure.': 'تلقت نافذة اعترافاً دولياً بالتميز في تسهيل التجارة، وفازت بجائزة مرموقة تعترف بمساهمات المنصة المهمة في تحديث البنية التحتية التجارية لمصر.',
  'The award recognizes Nafeza\'s achievements in:': 'تعترف الجائزة بإنجازات نافذة في:',
  'Implementing innovative digital trade solutions': 'تنفيذ حلول تجارية رقمية مبتكرة',
  'Improving trade facilitation and reducing processing times': 'تحسين تسهيل التجارة وتقليل أوقات المعالجة',
  'Enhancing transparency and efficiency in trade procedures': 'تعزيز الشفافية والكفاءة في إجراءات التجارة',
  'Supporting Egypt\'s economic development through trade facilitation': 'دعم التنمية الاقتصادية لمصر من خلال تسهيل التجارة',
  'This recognition reflects the hard work and dedication of the entire Nafeza team, as well as the support and collaboration of all stakeholders in Egypt\'s trade ecosystem. The award serves as validation of Egypt\'s commitment to digital transformation and modern trade practices.': 'يعكس هذا الاعتراف العمل الجاد والتزام فريق نافذة بأكمله، فضلاً عن دعم وتعاون جميع أصحاب المصلحة في نظام التجارة في مصر. تعمل الجائزة كتأكيد على التزام مصر بالتحول الرقمي وممارسات التجارة الحديثة.',
  'Nafeza remains committed to continuous improvement and innovation, building on this recognition to further enhance its services and support Egypt\'s position as a leader in digital trade facilitation in the region.': 'تظل نافذة ملتزمة بالتحسين المستمر والابتكار، مستفيدة من هذا الاعتراف لتعزيز خدماتها بشكل أكبر ودعم موقع مصر كرائدة في تسهيل التجارة الرقمية في المنطقة.',
  
  // Media article content - Article 11
  'Nafeza organized a technical workshop focusing on the integration of e-Signature capabilities with the Advance Cargo Information (ACI) system, enabling secure and legally compliant digital signing of trade documents.': 'نظمت نافذة ورشة عمل تقنية تركز على تكامل قدرات التوقيع الإلكتروني مع نظام معلومات الشحن المسبق (ACI)، مما يتيح التوقيع الرقمي الآمن والقانوني للمستندات التجارية.',
  'The workshop covered essential aspects of e-Signature implementation:': 'غطت ورشة العمل الجوانب الأساسية لتنفيذ التوقيع الإلكتروني:',
  'Legal framework and compliance requirements': 'الإطار القانوني ومتطلبات الامتثال',
  'Technical integration with e-Token USB devices': 'التكامل التقني مع أجهزة e-Token USB',
  'Security measures and best practices': 'إجراءات الأمان وأفضل الممارسات',
  'Step-by-step guide to signing documents digitally': 'دليل خطوة بخطوة لتوقيع المستندات رقمياً',
  'Participants learned how to use e-Token USB devices to sign trade declarations and other documents securely through the Nafeza platform. The e-Signature feature provides the same legal validity as physical signatures while offering enhanced security and convenience.': 'تعلم المشاركون كيفية استخدام أجهزة e-Token USB لتوقيع الإقرارات التجارية والمستندات الأخرى بأمان من خلال منصة نافذة. توفر ميزة التوقيع الإلكتروني نفس الصلاحية القانونية مثل التوقيعات المادية مع تقديم أمان وراحة محسنة.',
  'The workshop emphasized the importance of proper e-Signature implementation in maintaining document integrity and ensuring compliance with legal requirements. Participants gained hands-on experience with the system and received guidance on best practices for secure digital document signing.': 'أكدت ورشة العمل على أهمية تنفيذ التوقيع الإلكتروني المناسب في الحفاظ على سلامة المستندات وضمان الامتثال للمتطلبات القانونية. اكتسب المشاركون خبرة عملية مع النظام وتلقوا إرشادات حول أفضل الممارسات للتوقيع الرقمي الآمن للمستندات.',
  
  // Media article content - Article 12
  'The Nafeza Annual Conference successfully brought together industry leaders, government officials, trade professionals, and technology experts to discuss the future of digital trade in Egypt.': 'جمع مؤتمر نافذة السنوي بنجاح قادة الصناعة والمسؤولين الحكوميين والمهنيين التجاريين وخبراء التكنولوجيا لمناقشة مستقبل التجارة الرقمية في مصر.',
  'The conference featured keynote presentations, panel discussions, and interactive sessions covering:': 'شمل المؤتمر عروضاً رئيسية ومناقشات جماعية وجلسات تفاعلية تغطي:',
  'Current state and future vision of digital trade in Egypt': 'الوضع الحالي والرؤية المستقبلية للتجارة الرقمية في مصر',
  'Emerging technologies and their impact on trade facilitation': 'التقنيات الناشئة وتأثيرها على تسهيل التجارة',
  'International best practices and lessons learned': 'أفضل الممارسات الدولية والدروس المستفادة',
  'Collaboration opportunities between public and private sectors': 'فرص التعاون بين القطاعين العام والخاص',
  'Challenges and opportunities in the digital trade ecosystem': 'التحديات والفرص في نظام التجارة الرقمية',
  'Distinguished speakers from government, industry, and international organizations shared their insights and experiences, providing valuable perspectives on the evolution of digital trade. The conference served as a platform for networking and knowledge exchange among stakeholders.': 'شارك متحدثون متميزون من الحكومة والصناعة والمنظمات الدولية رؤاهم وتجاربهم، مقدمة وجهات نظر قيمة حول تطور التجارة الرقمية. خدم المؤتمر كمنصة للتواصل وتبادل المعرفة بين أصحاب المصلحة.',
  'The event concluded with a commitment to continued collaboration and innovation in advancing Egypt\'s digital trade capabilities. Participants left with a clearer understanding of the opportunities and challenges ahead, and a shared vision for the future of trade facilitation in Egypt.': 'اختتم الحدث بالتزام بالتعاون والابتكار المستمر في تعزيز قدرات التجارة الرقمية لمصر. غادر المشاركون بفهم أوضح للفرص والتحديات المقبلة، ورؤية مشتركة لمستقبل تسهيل التجارة في مصر.',
};

// Helper function to translate text
function translateText(text: string, language: Language): string {
  if (language === 'en' || !text) return text;
  return translationMap[text] || text;
}

// Helper function to translate HTML content while preserving HTML tags
function translateHtmlContent(html: string, language: Language): string {
  if (language === 'en' || !html) return html;
  
  // Simple approach: split HTML into tags and text, translate text parts
  const parts: Array<{ type: 'tag' | 'text'; content: string }> = [];
  let currentIndex = 0;
  
  // Parse HTML into tags and text segments
  const tagRegex = /<[^>]+>/g;
  let match;
  let lastIndex = 0;
  
  while ((match = tagRegex.exec(html)) !== null) {
    // Add text before tag
    if (match.index > lastIndex) {
      const text = html.substring(lastIndex, match.index);
      if (text.trim()) {
        parts.push({ type: 'text', content: text });
      }
    }
    // Add tag
    parts.push({ type: 'tag', content: match[0] });
    lastIndex = tagRegex.lastIndex;
  }
  
  // Add remaining text
  if (lastIndex < html.length) {
    const text = html.substring(lastIndex);
    if (text.trim()) {
      parts.push({ type: 'text', content: text });
    }
  }
  
  // If no tags found, treat entire string as text
  if (parts.length === 0) {
    parts.push({ type: 'text', content: html });
  }
  
  // Translate text parts
  const sortedEntries = Object.entries(translationMap)
    .filter(([en]) => en.length > 5)
    .sort(([a], [b]) => b.length - a.length);
  
  return parts.map(part => {
    if (part.type === 'tag') {
      return part.content;
    }
    
    let translated = part.content;
    for (const [en, ar] of sortedEntries) {
      const regex = new RegExp(escapeRegex(en), 'gi');
      translated = translated.replace(regex, ar);
    }
    return translated;
  }).join('');
}

// Helper to escape special regex characters
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Deep translate function that recursively translates objects
export function translateApiContent(content: any, language: Language): any {
  if (!content || language === 'en') {
    return content;
  }

  if (typeof content === 'string') {
    return translateText(content, language);
  }

  if (Array.isArray(content)) {
    return content.map(item => translateApiContent(item, language));
  }

  if (typeof content === 'object' && content !== null) {
    // Handle special cases for API responses
    const translated: any = {};
    for (const key in content) {
      if (content.hasOwnProperty(key)) {
        const value = content[key];
        
        // Skip non-translatable fields
        if (['id', 'value', 'icon', 'imageUrl', 'coordinates', 'lat', 'lng', 'phone', 'email', 'publishedDate', 'totalCenters', 'totalNews'].includes(key)) {
          translated[key] = value;
          continue;
        }
        
        // Translate common text fields
        if (typeof value === 'string' && ['title', 'description', 'subtitle', 'name', 'label', 'question', 'answer', 'category', 'location', 'address', 'workingHours', 'author'].includes(key)) {
          translated[key] = translateText(value, language);
        } else if (key === 'tags' && Array.isArray(value)) {
          // Translate tags array
          translated[key] = value.map(tag => translateText(tag, language));
        } else if (key === 'content' && typeof value === 'string') {
          // Translate HTML content while preserving HTML structure
          translated[key] = translateHtmlContent(value, language);
        } else {
          // Recursively translate nested objects and arrays
          translated[key] = translateApiContent(value, language);
        }
      }
    }
    return translated;
  }

  return content;
}
