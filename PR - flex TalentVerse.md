

## Flex Talentverse – Product Requirements &
Architecture Conβirmation (PR)

## 1. Project Overview
Flex Talentverse is a web-based campus hiring and talent evaluation
platform designed to facilitate structured recruitment activities between
students, colleges, and Flex HR. The platform enables Flex HR to manage
job postings and recruitment events, allows students to apply and
participate in these opportunities, and provides colleges with institutional
visibility and participation analytics.
The system supports four user roles: Student, HR, College Admin, and Super
Admin. Each role operates within clearly deβined responsibilities and access
boundaries to ensure controlled and secure interactions.
Flex Talentverse follows a layered web application architecture with a clear
separation between the frontend, backend, and data layers. All user
interactions are performed through the frontend, while the backend
handles business logic, data processing, and access control. This design
ensures scalability, maintainability, and security.
The platform is scoped exclusively for Flex-managed recruitment activities.
Third-party recruiters, public exposure of internal HR information, and
direct modiβication of student data by colleges are intentionally excluded to
maintain governance, data integrity, and privacy.










## 2. System Architecture Overview
Flex Talentverse is designed using a client–server architecture with a
layered structure. The system is divided into clearly deβined layers to
improve clarity, scalability, and ease of development.

## 2.1 Architecture Style
 Client–Server architecture
 REST-based communication
 Layered system design

2.2 High-Level System Layers
## Layer Description
## User Layer
Students, HR, College Admins, and Super Admins accessing
the system
## Frontend Layer
Web-based user interface providing role-speciβic
dashboards
## Backend Layer
Centralized application server handling business logic and
access control
Data Layer   Persistent storage for system data and documents
## External
## Services
Services used for notiβications such as Email and SMS

## 2.3 Frontend Layer
 Provides role-based dashboards for all users
 Handles user interactions and form submissions
 Communicates with backend using REST APIs over HTTPS
 Does not contain business logic or access control decisions


## 2.4 Backend Layer
 Exposes REST APIs for all system operations
 Implements business logic for:
o Job and event management
o Applications and evaluations
o Reporting and notiβications
 Enforces role-based access control for all requests
 Acts as the single authority for system rules

## 2.5 Data Layer
 Uses a relational database to store core system data such as:
o Users and roles
o Student, HR, and college information
o Jobs, events, and applications
o Evaluations and reports
 Stores resumes and related documents in a separate storage system
 Maintains data consistency and integrity

## 2.6 Data Flow Summary
 Users interact with the system through the frontend
 Frontend sends requests to the backend via REST APIs
 Backend processes requests and accesses the database as required
 Backend communicates with external services for notiβications
 Responses are sent back to the frontend for display




- User Roles and Responsibilities
Flex Talentverse deβines four distinct user roles. Each role has clearly
assigned responsibilities and controlled access to ensure secure and
organized system usage.

## 3.1 User Roles Overview
## Role Description
## Student
Individual users who apply for jobs and participate in
events
HR (Flex HR)  Internal Flex recruiters who manage hiring activities
## College
## Admin
Institutional representatives managing college information
Super Admin  System-level administrator with full governance control

## 3.2 Student Role
## Purpose:
To apply for job opportunities, participate in recruitment events, and
showcase skills and achievements.
## Responsibilities:
 Create and maintain personal student proβile
 Upload resumes and portfolio links
 View and apply for job postings
 Register for recruitment events
 Track application and event status
## Access Level:
 Full access to own student proβile and resume
 Read-only access to jobs and events
 View access to own application and evaluation status

 No access to HR proβiles, college proβiles, or other student proβiles

3.3 HR Role (Flex HR)
## Purpose:
To manage recruitment activities conducted by Flex.
## Responsibilities:
 Create and publish job postings
 Create and manage recruitment events
 View and evaluate student proβiles
 Shortlist candidates based on evaluation
 Monitor application and event participation
## Access Level:
 Create and manage jobs and recruitment events
 Read access to student proβiles for evaluation
 Read-only access to college proβiles
 No access to other HR proβiles or Super Admin controls

## 3.4 College Admin Role
## Purpose:
To represent the institution and showcase college-level information to Flex
## HR.
## Responsibilities:
 Create and maintain college proβile
 Showcase institutional details and achievements
 View participation statistics and reports
 Monitor student involvement in Flex activities



## Access Level:
 Edit access to own college proβile
 Read-only access to analytics and reports
 No access to individual student or HR proβiles

## 3.5 Super Admin Role
## Purpose:
To govern the platform and ensure policy compliance.
## Responsibilities:
 Manage all users and roles
 View and manage HR proβiles
 Oversee jobs, events, and evaluations
 Access system-wide reports and audit data
 Enforce platform policies and security controls
## Access Level:
 Full access across all system modules

- User and Proβile Data Model
Flex Talentverse follows a clear separation between User identity and
Proβile data. This design improves security, clarity, and scalability by
isolating authentication-related data from role-speciβic business
information.

4.1 User (Authentication Identity)
## Purpose:
Represents the login identity of a person in the system.
## Description:
A User is used only for authentication and role identiβication. All users,
regardless of role, are represented in the User entity.

## Key Attributes:
 User ID
##  Email
 Authentication provider reference (Clerk)
 Assigned role (Student, HR, College Admin, Super Admin)
 Account status (Active / Disabled)
## Access Rules:
 Managed by Super Admin
 Used internally for authentication and authorization
 Not directly exposed as a business entity

## 4.2 Student Proβile
## Purpose:
Represents the academic and skill-based identity of a student.
## Key Attributes:
 Personal and academic details
 Skills and competencies
 Projects and certiβications
 Resume and portfolio links
 Event participation history
 Evaluation and score records
## Visibility:
 Student: Full access to own proβile
 HR: Read-only access for evaluation
 Super Admin: Full access
 College Admin: Read-only access


4.3 HR Proβile (Internal – Flex)
## Purpose:
Represents internal Flex HR information for governance and auditing.
## Description:
HR proβiles are internal to Flex and are not visible to students or colleges.
They are used to track HR activity and manage internal recruitment
operations.
## Key Attributes:
 HR name
 Flex employee identiβier
 Department or team
 Activity metadata (jobs and events created)
 Account status
## Visibility:
 HR: Limited access to own proβile
 Super Admin: Full access
 Student and College Admin: No access

4.4 College Proβile (Institutional)
## Purpose:
Represents an institution’s identity and value within the platform.
## Key Attributes:
 College name and location
 Accreditation details
 Programs and departments offered
 Aggregate student strength
 Placement and participation statistics
 Institutional achievements


## Visibility:
 College Admin: Edit access to own proβile
 HR: Read-only access
 Super Admin: Full access
 Student: No access

## 4.5 Data Model Summary
## Entity     Description Primary Visibility
User Authentication identity  Backend only
## Student
## Proβile
Individual talent data
Student, HR, Super Admin ,
college
HR Proβile   Internal Flex HR data   Super Admin
## College Proβile
## Institutional
information
HR, College Admin, Super Admin

- Authentication and Authorization
Flex Talentverse implements a centralized and secure access control
mechanism using third-party authentication and backend-enforced
authorization. The system clearly separates identity veriβication from
permission management.

## 5.1 Authentication Approach
Authentication is handled using Clerk as the identity and authentication
provider.
## Clerk Responsibilities:
 User registration and login
 Password and session management
 Identity veriβication

 Issuing JSON Web Tokens (JWTs)
After successful login, Clerk generates a JWT that represents the
authenticated user session. This token is securely stored on the client side
and attached to every API request sent to the backend.

5.2 JWT Handling
 JWTs are issued by Clerk after authentication
 The frontend attaches the JWT to each API request
 Tokens are transmitted securely over HTTPS
 The backend validates the token for every request
JWTs are used only to establish identity and session validity and are not
trusted for authorization decisions.

5.3 Authorization Model (RBAC)
Flex Talentverse uses Role-Based Access Control (RBAC) to manage
permissions across the system.
## Key Characteristics:
 Each user is assigned a single role
 Roles determine allowed actions and data visibility
 Authorization checks are enforced at the API level
 No permission logic exists in the frontend

## 5.4 Backend Enforcement
The backend validates every incoming request by:
- Verifying the Clerk-issued JWT
- Identifying the user and assigned role
- Checking role-based permissions
- Allowing or denying access to the requested resource

This ensures that all access control decisions are centralized, consistent,
and secure.

## 5.5 Security Design Principles
 Authentication is delegated to a trusted provider (Clerk)
 Authorization logic resides only in the backend
 Frontend acts as a presentation layer without authority
 Unauthorized access is blocked at the API level

- Access Control and Permission Matrix
Flex Talentverse enforces access control using Role-Based Access Control
(RBAC). Each system operation is permitted or restricted based on the
user’s assigned role. This section deβines the βinal and authoritative
permission model.

## 6.1 Permission Types
## Permission Type Description
Read View data without modiβication
Write Create or update data
Manage Full control including approve, block, or delete









6.2 Role-Based Permission Matrix
## System Feature    Student
HR (Flex
## HR)
## College
## Admin
## Super Admin
Student Proβile (Own)  Write   – – Manage
## Student Proβiles
(Others)
–     Read (Full)
## Read
(Limited)
## Manage
HR Proβile –
## Own
(Limited)
## – Manage
College Proβile (Own)  –     Read    Write    Manage
## Job Postings Read   Write    – Manage
## Recruitment Events  Read   Write    – Manage
## Applications
## Write
(Own)
## Read    – Manage
## Evaluations &
## Shortlisting
## –     Write    – Manage
## Reports & Analytics  –     Read    Read    Manage
## User Management   –     – – Manage
## System Feature Student
HR (Flex
## HR)
## College
## Admin
## Super
## Admin
Student Proβile (Own)    Write   – – Manage
Student Proβiles (Others)  – Read    Read    Manage
HR Proβile –
## Own
(Limited)
## – Manage
College Proβile (Own)    – Read    Write    Manage
## Job Postings Read   Write    – Manage
## Recruitment Events     Read   Write    – Manage

## System Feature    Student
HR (Flex
## HR)
## College
## Admin
## Super Admin
## Applications
## Write
(Own)
## Read    – Manage
## Evaluations & Shortlisting  – Write    – Manage
## Reports & Analytics     – Read    Read    Manage
## User Management – – – Manage

## 6.3 Access Enforcement Rules
 All permissions are validated at the backend API level
 Frontend displays features based on role but does not enforce
security
 Unauthorized requests are rejected regardless of frontend behavior
 Super Admin has system-wide administrative privileges

6.4 Read-Only and Restricted Access
 College Admin access is strictly limited to institutional data and
reports
 Students cannot view or modify other users’ proβiles
 HR cannot access Super Admin controls or other HR proβiles
 Sensitive system operations require Super Admin authorization

## 7. Functional Requirements
This section deβines the functional behavior of Flex Talentverse, organized
by system modules. Each module speciβies what actions a role can perform
and how the system is expected to behave.

## 7.1 Student Module

## Purpose:
Enable students to showcase their proβile, apply for opportunities, and
track recruitment progress.
## Functional Requirements:
 Students shall be able to create and update their own student proβile
 Students shall be able to upload and update their resume
 Students shall be able to view available job postings
 Students shall be able to view available recruitment events
 Students shall be able to apply for jobs
 Students shall be able to register for events
 Students shall be able to view application and event participation
status
 Students shall be able to receive notiβications related to applications
and evaluations
## Restrictions:
 Students shall not view other students’ proβiles
 Students shall not view HR proβiles
 Students shall not modify jobs, events, or evaluations

7.2 HR Module (Flex HR)
## Purpose:
Enable Flex HR to manage recruitment activities and evaluate candidates.

## Functional Requirements:
 HR shall be able to create, edit, and publish job postings
 HR shall be able to create, manage, and publish recruitment events
 HR shall be able to view student proβiles for evaluation
 HR shall be able to shortlist candidates
 HR shall be able to record evaluation results

 HR shall be able to view college proβiles in read-only mode
 HR shall be able to view participation and recruitment reports

## Restrictions:
 HR shall not edit college proβiles
 HR shall not access other HR proβiles
 HR shall not access Super Admin controls

## 7.3 College Admin Module
## Purpose:
Enable colleges to showcase institutional information and monitor student
participation.
## Functional Requirements:
 College Admin shall be able to create and update the college proβile
 College Admin shall be able to view student proβiles in limited, read-
only mode
 College Admin shall be able to view participation statistics
 College Admin shall be able to access institutional-level reports
## Restrictions:
 College Admin shall not edit student proβiles
 College Admin shall not view HR proβiles
 College Admin shall not create or modify jobs or events

## 7.4 Super Admin Module
## Purpose:
Provide complete governance and control over the platform.
## Functional Requirements:
 Super Admin shall be able to manage all users and roles

 Super Admin shall be able to view and manage HR proβiles
 Super Admin shall be able to oversee jobs, events, and evaluations
 Super Admin shall be able to access all system reports
 Super Admin shall be able to enable, disable, or block user accounts
## Restrictions:
 None (full system access)

## 7.5 Functional Responsibility Summary
## Module Primary Responsibility
Student Proβile management and applications
HR Recruitment and evaluation
College Admin Institutional visibility and monitoring
Super Admin  System governance and control

- Job and Event Management
This section deβines how job postings and recruitment events are created,
managed, and made visible to users within the Flex Talentverse platform.

## 8.1 Job Management
## Purpose:
Enable Flex HR to publish job opportunities while allowing students to
understand eligibility requirements and improve their chances of applying.
## Functional Requirements:
 HR shall be able to create, edit, and publish job postings
 Job postings shall include role description, eligibility criteria,
location, and application deadlines
 All job postings shall be visible to all students

 Only students who meet the eligibility criteria shall be allowed to
apply directly
 The system shall evaluate eligibility based on student proβile data and
job requirements
 If a student is not eligible:
o The system shall display unmet eligibility criteria
o The student may update their proβile to meet eligibility
requirements
o The student may submit a request to HR for eligibility
consideration with supporting details
 HR shall be able to review eligibility requests and approve or reject
them
 Students shall be able to track job application status
 Super Admin shall have full control over all job postings

## 8.2 Event Management
## Purpose:
Enable Flex HR to conduct recruitment and evaluation events with
controlled participation.
## Functional Requirements:
 HR shall be able to create, edit, and publish recruitment events
 Events shall include event description, schedule, eligibility criteria,
and capacity
 Events shall be visible only to eligible students and eligible colleges
 Only eligible participants shall be allowed to register for events
 Students or colleges who are not eligible may submit a request to HR
for participation approval
 HR shall be able to approve or reject event participation requests
 Event participation shall be tracked at both student and college levels
 Super Admin shall have full control over all recruitment events


## 8.3 Eligibility Request Handling
 The system shall support eligibility request submission by:
o Students (for jobs and events)
o Colleges (for events)
 Eligibility requests shall include relevant proβile or institutional
information
 HR shall review and take action on eligibility requests
 Approved requests shall grant participation access as deβined by HR

8.4 Visibility and Access Summary
## Item Visibility Action Permission
Jobs All students
Apply if eligible or
approved
## Events
Eligible students and
colleges
Register if eligible or
approved
HR Identity Hidden from students   Not accessible
## College Participation
## Data
HR, College Admin, Super
## Admin
## Read-only

- Application and Evaluation Workβlow
This section describes the complete lifecycle of job applications and event
participation, from submission to evaluation and βinal status updates.

## 9.1 Job Application Workβlow
## Process Flow:
- Student views available job postings
- System checks student eligibility based on proβile and job criteria

- If eligible, student submits a job application
- If not eligible, student may:
o Update proβile to meet eligibility criteria, or
o Submit an eligibility request to HR
- Application details are stored and tracked by the system
- HR reviews applications and eligibility requests
- HR shortlists or rejects candidates
- Application status is updated and visible to the student

## 9.2 Event Registration Workβlow
## Process Flow:
- Student or college views eligible recruitment events
- System validates eligibility for the event
- Eligible participants register directly
- Non-eligible participants may submit a participation request to HR
- HR reviews and approves or rejects participation requests
- Event participation is recorded and tracked

9.3 Evaluation and Shortlisting
## Evaluation Process:
 HR evaluates students based on:
o Proβile information
o Application details
o Event performance (if applicable)
 Evaluation scores and remarks are recorded in the system
 HR performs candidate shortlisting based on evaluation outcomes


9.4 Feedback and Status Tracking
 Students can view:
o Application status
o Event participation status
o Evaluation outcomes (as permitted)
 Status changes trigger system notiβications
 Evaluation results contribute to the student’s proβile history

## 9.5 Workβlow Summary
## Stage Job Application Event Participation
Submission   Student applies  Student/College registers
Eligibility Check System + HR   System + HR
Evaluation   HR HR
## Decision    Shortlist / Reject Approve / Reject
## Notiβication   Student     Student / College

- Notiβication and Communication System
This section deβines how Flex Talentverse communicates important
updates to users in a timely and controlled manner.

## 10.1 Notiβication Purpose
Notiβications are used to inform users about key system events such as
application updates, eligibility decisions, event participation status, and
administrative actions.

## 10.2 Notiβication Triggers
Notiβications shall be triggered for the following events:

 Job application submission
 Job application status change (shortlisted or rejected)
 Eligibility request approval or rejection
 Event registration conβirmation
 Event participation approval or rejection
 System or account-related actions initiated by Super Admin

## 10.3 Notiβication Channels
 Email notiβications
 SMS notiβications (if enabled)
Notiβication channels are conβigurable and may vary based on user
preference and system policy.

## 10.4 Notiβication Delivery Rules
 Notiβications are generated by the backend
 Delivery status is tracked for auditing purposes
 Notiβications contain only relevant and non-sensitive information
 HR and administrative notiβications are restricted to authorized roles

## 10.5 Notiβication Access Control
## Role Receives Notiβications
Student    Application, eligibility, and event updates
HR Application and eligibility requests
College Admin Participation and institutional updates
Super Admin  System-wide alerts

- Reporting and Analytics

This section deβines the reporting and analytics capabilities of Flex
Talentverse, enabling stakeholders to monitor participation, performance,
and system effectiveness.

## 11.1 Reporting Objectives
The reporting module provides insights into recruitment activities and
institutional participation to support informed decision-making by HR,
colleges, and system administrators.

11.2 Types of Reports
Student-Level Reports:
 Application history
 Event participation history
 Application and evaluation status
College-Level Reports:
 Number of participating students
 Job and event participation statistics
 Aggregate performance indicators
HR-Level Reports:
 Job-wise application counts
 Event participation summaries
 Shortlisting and selection metrics
System-Level Reports:
 Overall platform usage
 Role-wise activity statistics
 Recruitment cycle summaries

11.3 Role-Based Access to Reports

Report Type Student HR
## College
## Admin
## Super
## Admin
Student Reports (Own) Read  – – Read
## Student Reports
(Others)
–    Read    Read (Limited) Read
College Reports     –    Read    Read (Own)  Read
HR Reports –
## Read
(Own)
## – Read
## System Reports     –    – – Read

11.4 Data Aggregation and Privacy
 Reports use aggregated and role-appropriate data
 Individual student evaluation details are restricted to HR and Super
## Admin
 Colleges receive only institutional-level insights
 All reports comply with access control and privacy rules

## 11.5 Analytics Usage
 HR uses analytics to assess recruitment effectiveness
 Colleges use analytics to monitor institutional participation
 Super Admin uses analytics for governance and system optimization

- Data Storage and Database Design
This section describes how data is stored, organized, and managed within
the Flex Talentverse platform to ensure consistency, scalability, and data
integrity.

## 12.1 Database Overview

Flex Talentverse uses a relational database to store all core system data.
The database is designed to support role-based access, transactional
consistency, and efβicient querying for reporting and analytics.

## 12.2 Core Database Entities
## Entity Description
Users Stores authentication identity and role information
Student Proβiles  Stores student academic and skill data
HR Proβiles    Stores internal Flex HR information
College Proβiles   Stores institutional information
Jobs Stores job postings created by HR
Events Stores recruitment events
Applications    Stores job applications and event registrations
Evaluations    Stores evaluation scores and remarks
Eligibility Requests Stores requests for job or event eligibility
Notiβications Stores notiβication logs
Reports Stores generated report metadata

12.3 Entity Relationships (High-Level)
 A User is associated with one role
 A Student Proβile is linked to one User
 An HR Proβile is linked to one User
 A College Proβile is linked to one College Admin User
 Jobs and Events are created by HR Proβiles
 Applications link Students to Jobs or Events
 Evaluations are linked to Applications

 Eligibility Requests are linked to Students or Colleges and reviewed
by HR

12.4 Resume and Document Storage
 Resumes and supporting documents are stored separately from the
relational database
 File storage is used for:
o Resumes
o Supporting documents for eligibility requests
 Database stores only βile references and metadata
 This approach improves performance and scalability

12.5 Data Integrity and Consistency
 Foreign key relationships enforce data consistency
 Transactions ensure atomic updates during applications and
evaluations
 Soft deletes may be used for audit and recovery purposes

- Security and Compliance
This section outlines the security measures and compliance considerations
implemented in Flex Talentverse to protect user data and ensure secure
system operations.

## 13.1 Security Objectives
 Protect user identity and sensitive data
 Prevent unauthorized access to system resources
 Ensure secure communication between system components
 Maintain auditability and accountability


13.2 Authentication and Session Security
 Authentication is handled by a trusted third-party provider (Clerk)
 Secure session management using JWTs
 Tokens are transmitted only over HTTPS
 Token validation is enforced for every backend request

13.3 Authorization and Access Control
 Role-Based Access Control (RBAC) is enforced at the backend
 All API endpoints perform role and permission checks
 Frontend does not enforce security rules
 Unauthorized requests are rejected at the API level

## 13.4 Data Protection
 Sensitive data is stored securely in the database
 Role-based data visibility prevents unauthorized exposure
 Personally identiβiable information is accessed only by authorized
roles
 Resume and document storage uses secure βile handling mechanisms

13.5 Audit and Monitoring
 User actions such as logins, applications, and evaluations are logged
 Administrative actions are auditable
 Logs support monitoring, troubleshooting, and compliance
veriβication

- Non-Functional Requirements

This section deβines the quality attributes and operational constraints that
Flex Talentverse must satisfy to ensure reliable and efβicient system
performance.

## 14.1 Performance
 The system shall support concurrent access by multiple users
 API responses for standard operations shall be delivered within
acceptable time limits
 Database queries shall be optimized for frequent read and write
operations

## 14.2 Scalability
 The system shall support growth in the number of users, jobs, and
events
 Backend services shall be designed to scale independently
 Data storage shall accommodate increasing volumes of proβiles and
applications

14.3 Availability and Reliability
 The system shall be available during standard operational hours
 Failures in one module shall not affect the entire system
 Data consistency shall be maintained during system failures

## 14.4 Maintainability
 The codebase shall follow modular design principles
 Clear separation of concerns shall be maintained across layers
 System components shall be easy to update and extend

## 14.5 Security

 All communication shall occur over secure channels
 Sensitive operations shall require strict authorization checks
 System vulnerabilities shall be minimized through secure design
practices

## 14.6 Usability
 The user interface shall be intuitive and role-speciβic
 System workβlows shall be easy to understand for βirst-time users
 Error messages shall be clear and informative

- Assumptions and Constraints
This section outlines the assumptions made during the design of Flex
Talentverse and the constraints under which the system operates. These
help set clear expectations for development and evaluation.

## 15.1 Assumptions
 All users access the system through a web-based frontend
 Authentication is handled by a third-party provider (Clerk)
 Users are assigned a single role at a time
 Flex HR is the only recruitment authority on the platform
 Colleges participate through designated College Admin accounts
 Students maintain accurate and up-to-date proβile information
 Internet connectivity is available for all users

## 15.2 Constraints
 The system does not support third-party or external recruiters
 HR proβiles are internal and not visible to students or colleges
 Colleges have read-only access to student proβiles with limited scope

 Authorization logic is enforced only at the backend
 Direct modiβication of student data by colleges is not permitted
 System features are limited to the deβined scope and roles

## 16. Future Enhancements
This section outlines potential enhancements that may be considered in
future versions of Flex Talentverse to improve functionality and scalability.

## 16.1 Advanced Evaluation Features
 AI-assisted candidate evaluation and scoring
 Skill-based ranking and recommendation mechanisms
 Automated shortlisting based on historical data

## 16.2 Enhanced Analytics
 Advanced dashboards for HR and Super Admin
 Trend analysis across recruitment cycles
 Predictive insights for hiring outcomes

## 16.3 System Integrations
 Integration with learning platforms for skill veriβication
 Integration with external assessment tools
 API support for enterprise reporting systems

## 16.4 Platform Expansion
 Mobile application support
 Multi-campus and multi-region support
 Conβigurable workβlows for different recruitment models


