-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2024 at 07:27 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `medlink`
--

-- --------------------------------------------------------

--
-- Table structure for table `authentication_user`
--

CREATE TABLE `authentication_user` (
  `id` bigint(20) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `email` varchar(254) NOT NULL,
  `name` varchar(255) NOT NULL,
  `otp_secret` varchar(16) DEFAULT NULL,
  `enable_2fa` tinyint(1) NOT NULL,
  `google_id` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authentication_user`
--

INSERT INTO `authentication_user` (`id`, `password`, `last_login`, `email`, `name`, `otp_secret`, `enable_2fa`, `google_id`) VALUES
(1, 'gAAAAABmp2qBghyUzj2q8rH7GdqEVzYkDY2GXaDLls1fDPqfchW_VLBYaAeVDyR6TM42Khl0__0bPOy47M_nmbS2JVOZ8gVTSg==', NULL, '', '', NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `auth_group`
--

CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_group_permissions`
--

CREATE TABLE `auth_group_permissions` (
  `id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `auth_permission`
--

CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_permission`
--

INSERT INTO `auth_permission` (`id`, `name`, `content_type_id`, `codename`) VALUES
(1, 'Can add log entry', 1, 'add_logentry'),
(2, 'Can change log entry', 1, 'change_logentry'),
(3, 'Can delete log entry', 1, 'delete_logentry'),
(4, 'Can view log entry', 1, 'view_logentry'),
(5, 'Can add permission', 2, 'add_permission'),
(6, 'Can change permission', 2, 'change_permission'),
(7, 'Can delete permission', 2, 'delete_permission'),
(8, 'Can view permission', 2, 'view_permission'),
(9, 'Can add group', 3, 'add_group'),
(10, 'Can change group', 3, 'change_group'),
(11, 'Can delete group', 3, 'delete_group'),
(12, 'Can view group', 3, 'view_group'),
(13, 'Can add content type', 4, 'add_contenttype'),
(14, 'Can change content type', 4, 'change_contenttype'),
(15, 'Can delete content type', 4, 'delete_contenttype'),
(16, 'Can view content type', 4, 'view_contenttype'),
(17, 'Can add session', 5, 'add_session'),
(18, 'Can change session', 5, 'change_session'),
(19, 'Can delete session', 5, 'delete_session'),
(20, 'Can view session', 5, 'view_session'),
(21, 'Can add patient', 6, 'add_patient'),
(22, 'Can change patient', 6, 'change_patient'),
(23, 'Can delete patient', 6, 'delete_patient'),
(24, 'Can view patient', 6, 'view_patient'),
(25, 'Can add user', 7, 'add_user'),
(26, 'Can change user', 7, 'change_user'),
(27, 'Can delete user', 7, 'delete_user'),
(28, 'Can view user', 7, 'view_user'),
(29, 'Can add doctor', 8, 'add_doctor'),
(30, 'Can change doctor', 8, 'change_doctor'),
(31, 'Can delete doctor', 8, 'delete_doctor'),
(32, 'Can view doctor', 8, 'view_doctor'),
(33, 'Can add password reset request', 9, 'add_passwordresetrequest'),
(34, 'Can change password reset request', 9, 'change_passwordresetrequest'),
(35, 'Can delete password reset request', 9, 'delete_passwordresetrequest'),
(36, 'Can view password reset request', 9, 'view_passwordresetrequest'),
(37, 'Can add doctor', 10, 'add_doctor'),
(38, 'Can change doctor', 10, 'change_doctor'),
(39, 'Can delete doctor', 10, 'delete_doctor'),
(40, 'Can view doctor', 10, 'view_doctor'),
(41, 'Can add appointment', 11, 'add_appointment'),
(42, 'Can change appointment', 11, 'change_appointment'),
(43, 'Can delete appointment', 11, 'delete_appointment'),
(44, 'Can view appointment', 11, 'view_appointment'),
(45, 'Can add reminders', 12, 'add_reminders'),
(46, 'Can change reminders', 12, 'change_reminders'),
(47, 'Can delete reminders', 12, 'delete_reminders'),
(48, 'Can view reminders', 12, 'view_reminders'),
(49, 'Can add timelines', 13, 'add_timelines'),
(50, 'Can change timelines', 13, 'change_timelines'),
(51, 'Can delete timelines', 13, 'delete_timelines'),
(52, 'Can view timelines', 13, 'view_timelines'),
(53, 'Can add message', 14, 'add_message'),
(54, 'Can change message', 14, 'change_message'),
(55, 'Can delete message', 14, 'delete_message'),
(56, 'Can view message', 14, 'view_message'),
(57, 'Can add chat', 15, 'add_chat'),
(58, 'Can change chat', 15, 'change_chat'),
(59, 'Can delete chat', 15, 'delete_chat'),
(60, 'Can view chat', 15, 'view_chat'),
(61, 'Can add doctor note', 16, 'add_doctornote'),
(62, 'Can change doctor note', 16, 'change_doctornote'),
(63, 'Can delete doctor note', 16, 'delete_doctornote'),
(64, 'Can view doctor note', 16, 'view_doctornote'),
(65, 'Can add medication', 17, 'add_medication'),
(66, 'Can change medication', 17, 'change_medication'),
(67, 'Can delete medication', 17, 'delete_medication'),
(68, 'Can view medication', 17, 'view_medication'),
(69, 'Can add refill request', 18, 'add_refillrequest'),
(70, 'Can change refill request', 18, 'change_refillrequest'),
(71, 'Can delete refill request', 18, 'delete_refillrequest'),
(72, 'Can view refill request', 18, 'view_refillrequest'),
(73, 'Can add medication', 19, 'add_medication'),
(74, 'Can change medication', 19, 'change_medication'),
(75, 'Can delete medication', 19, 'delete_medication'),
(76, 'Can view medication', 19, 'view_medication'),
(77, 'Can add refill request', 20, 'add_refillrequest'),
(78, 'Can change refill request', 20, 'change_refillrequest'),
(79, 'Can delete refill request', 20, 'delete_refillrequest'),
(80, 'Can view refill request', 20, 'view_refillrequest'),
(81, 'Can add notice board', 21, 'add_noticeboard'),
(82, 'Can change notice board', 21, 'change_noticeboard'),
(83, 'Can delete notice board', 21, 'delete_noticeboard'),
(84, 'Can view notice board', 21, 'view_noticeboard'),
(85, 'Can add doctors_call', 22, 'add_doctors_call'),
(86, 'Can change doctors_call', 22, 'change_doctors_call'),
(87, 'Can delete doctors_call', 22, 'delete_doctors_call'),
(88, 'Can view doctors_call', 22, 'view_doctors_call'),
(89, 'Can add doctors_call', 23, 'add_doctors_call'),
(90, 'Can change doctors_call', 23, 'change_doctors_call'),
(91, 'Can delete doctors_call', 23, 'delete_doctors_call'),
(92, 'Can view doctors_call', 23, 'view_doctors_call');

-- --------------------------------------------------------

--
-- Table structure for table `bookappointments_appointment`
--

CREATE TABLE `bookappointments_appointment` (
  `id` bigint(20) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `speciality` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `time` time(6) NOT NULL,
  `period` varchar(10) NOT NULL,
  `consultation_type` varchar(10) NOT NULL,
  `problem_description` longtext NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `patient_email` varchar(254) NOT NULL,
  `doctor_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookappointments_appointment`
--

INSERT INTO `bookappointments_appointment` (`id`, `doctor_name`, `speciality`, `date`, `time`, `period`, `consultation_type`, `problem_description`, `patient_name`, `patient_email`, `doctor_image`) VALUES
(38, 'John Doe', 'Physio', '2024-09-08', '11:00:00.000000', 'Morning', 'inPerson', 'Hey there this is the first appointment', 'Venessa Awuor', 'venessaawuor22@gmail.com', '../../doctors/doc-1.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `chats_chat`
--

CREATE TABLE `chats_chat` (
  `id` bigint(20) NOT NULL,
  `started_at` datetime(6) NOT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats_chat`
--

INSERT INTO `chats_chat` (`id`, `started_at`, `user_id`) VALUES
(1, '2024-08-22 18:18:18.000000', 1),
(2, '2024-08-26 15:22:01.400138', 1),
(3, '2024-08-26 15:23:32.459226', 1),
(4, '2024-08-26 15:27:02.641542', 1),
(5, '2024-08-26 15:27:10.123181', 1),
(6, '2024-08-26 15:27:17.909866', 1),
(7, '2024-08-26 15:29:50.233323', 1);

-- --------------------------------------------------------

--
-- Table structure for table `chats_message`
--

CREATE TABLE `chats_message` (
  `id` bigint(20) NOT NULL,
  `content` longtext NOT NULL,
  `sent_at` datetime(6) NOT NULL,
  `chat_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chats_message`
--

INSERT INTO `chats_message` (`id`, `content`, `sent_at`, `chat_id`) VALUES
(1, 'hello', '2024-08-26 15:22:16.600928', 2),
(2, 'how are you?', '2024-08-26 15:22:46.651463', 2),
(3, 'I miss you so much', '2024-08-26 15:23:01.150810', 2),
(4, 'hello', '2024-08-26 15:27:05.704615', 4),
(5, 'hey', '2024-08-26 15:27:22.425644', 6),
(6, 'hello', '2024-08-26 15:29:52.507957', 7),
(7, 'http://localhost:3000/logov2.svg', '2024-08-26 15:29:58.910956', 7);

-- --------------------------------------------------------

--
-- Table structure for table `django_admin_log`
--

CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext DEFAULT NULL,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) UNSIGNED NOT NULL CHECK (`action_flag` >= 0),
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `django_content_type`
--

CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_content_type`
--

INSERT INTO `django_content_type` (`id`, `app_label`, `model`) VALUES
(1, 'admin', 'logentry'),
(3, 'auth', 'group'),
(2, 'auth', 'permission'),
(9, 'authentication', 'passwordresetrequest'),
(7, 'authentication', 'user'),
(11, 'bookAppointments', 'appointment'),
(15, 'chats', 'chat'),
(14, 'chats', 'message'),
(10, 'clinician', 'doctor'),
(4, 'contenttypes', 'contenttype'),
(8, 'doctors', 'doctor'),
(22, 'doctors', 'doctors_call'),
(16, 'doctorsnotes', 'doctornote'),
(19, 'medication', 'medication'),
(20, 'medication', 'refillrequest'),
(17, 'medications', 'medication'),
(18, 'medications', 'refillrequest'),
(21, 'noticeboard', 'noticeboard'),
(23, 'online_doctors', 'doctors_call'),
(6, 'patients', 'patient'),
(12, 'reminders', 'reminders'),
(5, 'sessions', 'session'),
(13, 'timelines', 'timelines');

-- --------------------------------------------------------

--
-- Table structure for table `django_migrations`
--

CREATE TABLE `django_migrations` (
  `id` bigint(20) NOT NULL,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_migrations`
--

INSERT INTO `django_migrations` (`id`, `app`, `name`, `applied`) VALUES
(1, 'contenttypes', '0001_initial', '2024-07-29 07:27:54.123477'),
(2, 'authentication', '0001_initial', '2024-07-29 07:27:54.190372'),
(3, 'admin', '0001_initial', '2024-07-29 07:27:54.355756'),
(4, 'admin', '0002_logentry_remove_auto_add', '2024-07-29 07:27:54.355756'),
(5, 'admin', '0003_logentry_add_action_flag_choices', '2024-07-29 07:27:54.377260'),
(6, 'contenttypes', '0002_remove_content_type_name', '2024-07-29 07:27:54.463443'),
(7, 'auth', '0001_initial', '2024-07-29 07:27:54.776265'),
(8, 'auth', '0002_alter_permission_name_max_length', '2024-07-29 07:27:54.856659'),
(9, 'auth', '0003_alter_user_email_max_length', '2024-07-29 07:27:54.894323'),
(10, 'auth', '0004_alter_user_username_opts', '2024-07-29 07:27:54.913133'),
(11, 'auth', '0005_alter_user_last_login_null', '2024-07-29 07:27:54.927527'),
(12, 'auth', '0006_require_contenttypes_0002', '2024-07-29 07:27:54.932721'),
(13, 'auth', '0007_alter_validators_add_error_messages', '2024-07-29 07:27:54.944460'),
(14, 'auth', '0008_alter_user_username_max_length', '2024-07-29 07:27:54.961280'),
(15, 'auth', '0009_alter_user_last_name_max_length', '2024-07-29 07:27:54.973402'),
(16, 'auth', '0010_alter_group_name_max_length', '2024-07-29 07:27:54.999082'),
(17, 'auth', '0011_update_proxy_permissions', '2024-07-29 07:27:55.013332'),
(18, 'auth', '0012_alter_user_first_name_max_length', '2024-07-29 07:27:55.026428'),
(19, 'patients', '0001_initial', '2024-07-29 07:27:55.058507'),
(20, 'patients', '0002_patient_last_login_alter_patient_consent_to_treat_and_more', '2024-07-29 07:27:55.502990'),
(21, 'sessions', '0001_initial', '2024-07-29 07:27:55.539479'),
(22, 'doctors', '0001_initial', '2024-07-30 12:43:26.714317'),
(23, 'authentication', '0002_passwordresetrequest', '2024-07-31 05:10:12.661818'),
(24, 'authentication', '0003_delete_passwordresetrequest', '2024-07-31 05:24:42.394935'),
(25, 'patients', '0003_patient_otp_secret', '2024-07-31 08:11:45.004247'),
(26, 'patients', '0004_remove_patient_otp_secret_patient_otp_code', '2024-07-31 10:28:27.872942'),
(27, 'clinician', '0001_initial', '2024-07-31 12:58:14.697452'),
(28, 'clinician', '0002_remove_doctor_confirm_password', '2024-07-31 13:07:48.201638'),
(29, 'authentication', '0004_user_google_id', '2024-08-03 11:37:39.100374'),
(30, 'patients', '0005_patient_google_id', '2024-08-03 11:50:07.338296'),
(31, 'bookAppointments', '0001_initial', '2024-08-16 06:49:26.530468'),
(32, 'bookAppointments', '0002_appointment_doctor_image_and_more', '2024-08-16 10:25:14.027439'),
(33, 'reminders', '0001_initial', '2024-08-17 09:41:29.923695'),
(34, 'reminders', '0002_reminders_long_description', '2024-08-25 05:11:29.162081'),
(35, 'timelines', '0001_initial', '2024-08-25 17:13:14.840994'),
(36, 'chats', '0001_initial', '2024-08-26 14:59:53.798457'),
(37, 'doctorsnotes', '0001_initial', '2024-08-29 14:07:42.481993'),
(38, 'doctorsnotes', '0002_doctornote_advice', '2024-08-29 14:18:28.607820'),
(39, 'medications', '0001_initial', '2024-08-29 16:57:20.976795'),
(40, 'medications', '0002_refillrequest', '2024-08-29 18:38:16.525407'),
(41, 'medication', '0001_initial', '2024-08-31 11:08:29.381753'),
(42, 'medication', '0002_refillrequest_medid_refillrequest_patient_name', '2024-08-31 11:12:09.914643'),
(43, 'noticeboard', '0001_initial', '2024-09-01 07:09:41.684749'),
(44, 'online_doctors', '0001_initial', '2024-09-01 18:06:37.085993'),
(45, 'patients', '0006_patient_city', '2024-09-04 14:29:06.678438'),
(46, 'patients', '0007_patient_groups_patient_is_active_patient_is_staff_and_more', '2024-09-05 03:18:02.547277'),
(47, 'doctorsnotes', '0003_doctornote_patient_email', '2024-09-05 03:42:49.491776');

-- --------------------------------------------------------

--
-- Table structure for table `django_session`
--

CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `django_session`
--

INSERT INTO `django_session` (`session_key`, `session_data`, `expire_date`) VALUES
('0lbkgewrtaoofq5uyywreojuzqbz6v1x', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sllsS:S4NcY09JI38pP5-3U93i_Ivtle8ZqqfXKH8h6ukITdg', '2024-09-04 11:00:36.589982'),
('2vt8hgm4oe4jg6ycflls54ngjtqz6vfi', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slm0X:nFClXwW_9vVq418aMgRrmM6-Ofr89RZiSwO8Ar25F8A', '2024-09-04 11:08:57.617409'),
('3hsgpluvsoqktkk1utytyykddudj3kt9', '.eJxVjssKgzAURP8l6yJ5mKRxVbrvN4Qbc9VUG0ui0FL6740gBbdnZg7zITZjzmGOFl_PkN6k0ZzSE7GwLoNdMyYbPGkIo-QAHbQjxi3xd4j9XLVzXFJw1Vap9jRXt9njdN27B8EAeShrZZiCmgsltaudaTsBjPtCKZjCKAII5QRI1WmNXKKjIA3VUAsmz0YU6f8kK7_xAWEq3j5MDtMy4oJJS3PpN15OPsj3ByPDTzI:1slnZc:xlNDwBIj7FeOPoBKGILKtpi1fdb9CsZMVjYLBRfq638', '2024-09-04 12:49:16.664110'),
('4rgsbl14lfoxdwuh4tp2mz69qrqpa6ga', '.eJxVjMsOwiAUBf-FtSE8CkiX7t34A-RSbi1qwZQ2sTH-uzTpptuZM-dLEoxIWnKDdcwpkBNxBUuJOTn8vOO0ktYIxiqGZR7cUnByMdSAM3KAHronps2EB6R7pl1O8xQ93SZ0t4Vec8DXZd8eDgYoQ6215RoaIbUyvvG26yVwESplYCtjCCC1l6B0bwwKhZ6BssxAI7k6W0l-f-cjRE8:1slkZy:yDc8-WO9RYnDseDG4VQLz3cNDqNo-8Rcgw107uH0-zM', '2024-09-04 09:37:26.993447'),
('6sh5glx0k2gn333c4ns1ue5jrivf3j9z', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slmXt:aH34-QA4hfT5wqTC9NanBaVzO-oBL7qMcv9FRcXnfFo', '2024-09-04 11:43:25.859827'),
('6vtl9r59clattrqoi0ts68zy3nlew3ku', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slmPy:Wy5qEM1D_3eM_xe4wc7oBghpUfiukDjZJMu_2nP5qLU', '2024-09-04 11:35:14.530145'),
('7y001lun19eapoz8xk115ol5pk52kqrv', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sllhD:Ybc9vXmSfFanBjJqDSi5oR6-gMmCmlRwY7juFoxH9xc', '2024-09-04 10:48:59.800564'),
('ble92uky2qpkyik9mqnwibgi7qd5ww7g', '.eJxVjMsOwiAUBf-FtSE8CkiX7t34A-RSbi1qwZQ2sTH-uzTpptuZM-dLEoxIWnKDdcwpkBNxBUuJOTn8vOO0ktYIxiqGZR7cUnByMdSAM3KAHronps2EB6R7pl1O8xQ93SZ0t4Vec8DXZd8eDgYoQ6215RoaIbUyvvG26yVwESplYCtjCCC1l6B0bwwKhZ6BssxAI7k6W0l-f-cjRE8:1slRTJ:qRHgzWFCHb7dvKiiwgNbZfH0nfKBP-xHNqj-WcTdJAQ', '2024-09-03 13:13:17.707961'),
('f3k08g4kmigyju8l1dks0pvybc1kbnvb', '.eJxVjMsOwiAUBf-FtSE8CkiX7t34A-RSbi1qwZQ2sTH-uzTpptuZM-dLEoxIWnKDdcwpkBNxBUuJOTn8vOO0ktYIxiqGZR7cUnByMdSAM3KAHronps2EB6R7pl1O8xQ93SZ0t4Vec8DXZd8eDgYoQ6215RoaIbUyvvG26yVwESplYCtjCCC1l6B0bwwKhZ6BssxAI7k6W0l-f-cjRE8:1slREH:26ueRqNJusNG1CFUbnROh3W-fgtp6aXTAazxV7HkBcg', '2024-09-03 12:57:45.491852'),
('idenvl769hq9cgd6nlrahoq0fiptvr76', '.eJxVjMsOwiAUBf-FtSE8CkiX7t34A-RSbi1qwZQ2sTH-uzTpptuZM-dLEoxIWnKDdcwpkBNxBUuJOTn8vOO0ktYIxiqGZR7cUnByMdSAM3KAHronps2EB6R7pl1O8xQ93SZ0t4Vec8DXZd8eDgYoQ6215RoaIbUyvvG26yVwESplYCtjCCC1l6B0bwwKhZ6BssxAI7k6W0l-f-cjRE8:1slRZF:Da7e_3andjB_y1lLRhU_kTpYDGjbrLsSTvn0pz4IKSw', '2024-09-03 13:19:25.958475'),
('ky05kl01eult0lx9jsras95shje4wsdz', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sllmr:tF72xm6cf8utKh5R9ErpHY6238hbFBFy78hM35lbPVY', '2024-09-04 10:54:49.753679'),
('mbo4xlbj0t31fv33vqk8ap0d7hskpxbb', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slm17:YuvpRgl1GbpXYvsKBknPPRW_4-lS7CWuzKfe8b0sRfw', '2024-09-04 11:09:33.530623'),
('n8gftt79mj5vyugqfov0ja81dlm8c12p', '.eJxVjssKgzAURP8l6yJ5mKRxVbrvN4Qbc9VUG0ui0FL6740gBbdnZg7zITZjzmGOFl_PkN6k0ZzSE7GwLoNdMyYbPGkIo-QAHbQjxi3xd4j9XLVzXFJw1Vap9jRXt9njdN27B8EAeShrZZiCmgsltaudaTsBjPtCKZjCKAII5QRI1WmNXKKjIA3VUAsmz0YU6f8kK7_xAWEq3j5MDtMy4oJJS3PpN15OPsj3ByPDTzI:1slplY:Pnj9pVg96-Sdve16fvYNynq8InxJTw6ACwBso-ToAF4', '2024-09-04 15:09:44.162894'),
('na3focorl6193o8iavl8xr4s9fdgsuqg', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sllnq:owwQRe2LYOfeXQV2kJEpqgXzyUgcQDYSzhi6ZW0ci7Y', '2024-09-04 10:55:50.477497'),
('nuyci6aew8shi8kp4wf06krxt52t0su7', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sllk1:OaRIx_nzvS0MFaM65dQWq13yUo2WZtrAoIAF0cfj0vo', '2024-09-04 10:51:53.626029'),
('o8ocutd0lvl2k233r7cnx7gl3bex4lg8', '.eJxVjMsOwiAUBf-FtSE8CkiX7t34A-RSbi1qwZQ2sTH-uzTpptuZM-dLEoxIWnKDdcwpkBNxBUuJOTn8vOO0ktYIxiqGZR7cUnByMdSAM3KAHronps2EB6R7pl1O8xQ93SZ0t4Vec8DXZd8eDgYoQ6215RoaIbUyvvG26yVwESplYCtjCCC1l6B0bwwKhZ6BssxAI7k6W0l-f-cjRE8:1slRW5:cF04vusiQWHBtphEkA-GiuT8OD_0g3Eue-f0QoJm-1E', '2024-09-03 13:16:09.934867'),
('sd5as164cnf11s6uuwk2hgzv98ejaifr', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slmm1:idJcEPqD68_mou-5IQDEpqIP_4nQjeZAGDCyKLDvh88', '2024-09-04 11:58:01.656483'),
('t71zgehxygkayj5ff01a02gl03sfu05r', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sllj8:xmSvsqfgoiFe_F4FwHTcze3ENUT18_NI2vrB9KcGaD8', '2024-09-04 10:50:58.175210'),
('to7xavtdey62qyp2dhe9xezn2io2xkv5', '.eJxVjssKwjAQRf8l61Jm7COJK3HvN4RJMmmjfUjSgiL-uy2I4Paeew_3JUzmnOM8GX7cY3qKozwAFMLQuvRmzZxM9OIoUIu_0JK78bQTf6Wpm0s3T0uKttwr5Zfm8jJ7Hs7f7p-gp9xva2gDWABWGtDapqo91oCtRNk4FchpaYMFrJSUrkUMwVMgRUHJlmr0bpP-TqIuBI8Uh83bxcFyWm68cJKNPnV7vp0cxfsDa4BQVw:1sm4q5:66099kwKLdgHwqhVu7XzMVBaEowdkiAnCF_eeaadkL0', '2024-09-05 07:15:25.834422'),
('tsfknr7g84293oq5jymoeetm2rn6bv9c', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slmZC:0setV3SLN049ZXXcyeSh_buCwTZo-s6CTUjlttBhhnc', '2024-09-04 11:44:46.049034'),
('vdji66rwdy8vq5fqhxfqqstxe1fxhfy8', '.eJxVjMsOwiAUBf-FtSE8CkiX7t34A-RSbi1qwZQ2sTH-uzTpptuZM-dLEoxIWnKDdcwpkBNxBUuJOTn8vOO0ktYIxiqGZR7cUnByMdSAM3KAHronps2EB6R7pl1O8xQ93SZ0t4Vec8DXZd8eDgYoQ6215RoaIbUyvvG26yVwESplYCtjCCC1l6B0bwwKhZ6BssxAI7k6W0l-f-cjRE8:1slVSe:OciqSljymoQ2fywCSNc1BtWLYa-XWcAkFOuMzX5RsO8', '2024-09-03 17:28:52.263181'),
('wnaklwi12sk0nqia0gl9cdks2lsve62u', '.eJxVjssKgzAURP8l6yJ5mKRxVbrvN4Qbc9VUG0ui0FL6740gBbdnZg7zITZjzmGOFl_PkN6k0ZzSE7GwLoNdMyYbPGkIo-QAHbQjxi3xd4j9XLVzXFJw1Vap9jRXt9njdN27B8EAeShrZZiCmgsltaudaTsBjPtCKZjCKAII5QRI1WmNXKKjIA3VUAsmz0YU6f8kK7_xAWEq3j5MDtMy4oJJS3PpN15OPsj3ByPDTzI:1slnPz:pHYWgKAayXm3hqYIOMMFTUwHg8bZcPzKUkxT0r182rI', '2024-09-04 12:39:19.449440'),
('xm7p47lpm4tyy169lr2aix5kpjf8wnv2', '.eJxVj8sKgzAURP8laxHNw0RXpft-Q7h5qGk1KYn2Qem_N4IU3F1mzh1mPkgmm5ILXtrX3cU36jiuqgJJWJdRrslG6QzqEEUHTYG-Wb8Z5gp-CKUOfolOlRtS7m4qL8HY6byzh4AR0pi_W6GgaXva0DqfxpBKEEU5YxiY6GvS1hozy2ivFW8FVFhxAC4yS5TugeTQf0daIDuDm3Lsw_q8CuC5hojxadjkXHFG3x-Qk0-M:1sm4zY:K0MKqruDCpMMdW2uh4DD2snPdD3tm1V34Hx0iChrUXc', '2024-09-05 07:25:12.986906'),
('xvf1xmz3u9sy7n2pol2oagqtlu5p5579', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sllpS:OuyS3BRjU5-kVtmuvXygACFVwJzvepbXBeh_G1XP2bg', '2024-09-04 10:57:30.783327'),
('xyee6yfslv6flqxwnpenbjetnzhw7dp2', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slmEi:kLszPIz82SgAqx61kESyOJIKUCVBMm_2wb3_7hxefqo', '2024-09-04 11:23:36.915097'),
('yo0rzpi2yzzc9zb63tb9x2rhxtciactv', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1sll93:cdIHIspSc4txAHFZOgKGF88r2UO9KNIPS-f1E50yA4Y', '2024-09-04 10:13:41.378080'),
('zwk96ka8hab2nt7r69a0vu20jh12cxoe', '.eJxVjDsOwjAQBe_iGlnrP05JzxmsdbwhBmSjOJFAiLuTSGnSzsx7XxYatZZrCfR-5enDOicBTizgMo9haTSFnFjHBLADjNg_qGwm3bHcKu9rmacc-Zbw3TZ-rYmel709HIzYxnVtvbCopbLGRR19PygUMq0U0K8MCFHZqNDYwTmShiKg8eBQK2HOXrHfH5SBPuY:1slmnu:ZhhrM0zV42-v8zG5wAIeDpehGqkIud_wkcSlg23Stk0', '2024-09-04 11:59:58.130670');

-- --------------------------------------------------------

--
-- Table structure for table `doctorsnotes_doctornote`
--

CREATE TABLE `doctorsnotes_doctornote` (
  `id` bigint(20) NOT NULL,
  `doctor` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `note` longtext NOT NULL,
  `status` varchar(50) NOT NULL,
  `advice` longtext NOT NULL,
  `patient_email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doctorsnotes_doctornote`
--

INSERT INTO `doctorsnotes_doctornote` (`id`, `doctor`, `date`, `note`, `status`, `advice`, `patient_email`) VALUES
(4, 'hhh', '2024-08-31', 'czxggggggggggggggg', 'Pending', 'hiii', 'gilbertketer759@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `medication_medication`
--

CREATE TABLE `medication_medication` (
  `id` bigint(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `spoons` varchar(10) NOT NULL,
  `after_before` varchar(10) NOT NULL,
  `am_pm` varchar(10) NOT NULL,
  `days_left` varchar(10) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medication_medication`
--

INSERT INTO `medication_medication` (`id`, `email`, `heading`, `spoons`, `after_before`, `am_pm`, `days_left`, `description`) VALUES
(1, 'gilbertketer759@gmail.com', 'Panadol', '2', 'after', 'pm', '3', 'Take medication after every meal for 10 days'),
(2, 'venessaawuor22@gmail.com', 'Piriton', '3', 'before', 'Am', '1', 'Take medication after every meal for 10 days');

-- --------------------------------------------------------

--
-- Table structure for table `medication_refillrequest`
--

CREATE TABLE `medication_refillrequest` (
  `id` bigint(20) NOT NULL,
  `email` varchar(254) NOT NULL,
  `medication` varchar(255) NOT NULL,
  `quantity` int(10) UNSIGNED NOT NULL CHECK (`quantity` >= 0),
  `reason` longtext NOT NULL,
  `requested_at` datetime(6) NOT NULL,
  `medId` int(10) UNSIGNED NOT NULL CHECK (`medId` >= 0),
  `patient_name` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `medication_refillrequest`
--

INSERT INTO `medication_refillrequest` (`id`, `email`, `medication`, `quantity`, `reason`, `requested_at`, `medId`, `patient_name`) VALUES
(4, 'venessaawuor22@gmail.com', 'Piriton', 10, 'I still want them for some reason', '2024-09-05 05:05:51.224606', 2, 'Venessa Awuor');

-- --------------------------------------------------------

--
-- Table structure for table `noticeboard_noticeboard`
--

CREATE TABLE `noticeboard_noticeboard` (
  `id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `content` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `noticeboard_noticeboard`
--

INSERT INTO `noticeboard_noticeboard` (`id`, `title`, `content`, `created_at`, `is_active`) VALUES
(1, 'New Flu Medication', 'The new flu medication will roll out early next week. Please consult with your doctor for more information.', '2024-09-01 10:09:56.000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `online_doctors_doctors_call`
--

CREATE TABLE `online_doctors_doctors_call` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `online` tinyint(1) NOT NULL,
  `peer_id` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `online_doctors_doctors_call`
--

INSERT INTO `online_doctors_doctors_call` (`id`, `name`, `email`, `online`, `peer_id`) VALUES
(1, 'Dr Keter', 'gilbertketer759@gmail.com', 1, 'wefbgvfdsfvgbbrbegd'),
(2, 'Dr Brian', 'brian@gmail.com', 1, 'jddfhjklhgnvx'),
(3, 'Dr Kyllian', 'kyllian@gmail.com', 0, 'fgngfbdvscs');

-- --------------------------------------------------------

--
-- Table structure for table `patients_patient`
--

CREATE TABLE `patients_patient` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `emergency_contact_name` varchar(255) NOT NULL,
  `emergency_contact_relationship` varchar(50) NOT NULL,
  `emergency_contact_phone` varchar(10) NOT NULL,
  `emergency_contact_email` varchar(254) NOT NULL,
  `current_health_conditions` longtext NOT NULL,
  `past_medical_history` longtext NOT NULL,
  `allergies` longtext NOT NULL,
  `current_medications` longtext NOT NULL,
  `primary_care_physician` varchar(255) NOT NULL,
  `family_health_conditions` longtext NOT NULL,
  `lifestyle_habits` longtext NOT NULL,
  `exercise_routine` longtext NOT NULL,
  `dietary_habits` longtext NOT NULL,
  `insurance_provider` varchar(255) NOT NULL,
  `policy_number` varchar(255) NOT NULL,
  `insurance_phone` varchar(10) NOT NULL,
  `consent_to_treat` tinyint(1) NOT NULL,
  `privacy_policy` tinyint(1) NOT NULL,
  `password` varchar(128) NOT NULL,
  `enable_2fa` tinyint(1) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `otp_code` varchar(6) DEFAULT NULL,
  `google_id` varchar(150) DEFAULT NULL,
  `city` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_superuser` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients_patient`
--

INSERT INTO `patients_patient` (`id`, `name`, `date_of_birth`, `gender`, `email`, `phone_number`, `address`, `emergency_contact_name`, `emergency_contact_relationship`, `emergency_contact_phone`, `emergency_contact_email`, `current_health_conditions`, `past_medical_history`, `allergies`, `current_medications`, `primary_care_physician`, `family_health_conditions`, `lifestyle_habits`, `exercise_routine`, `dietary_habits`, `insurance_provider`, `policy_number`, `insurance_phone`, `consent_to_treat`, `privacy_policy`, `password`, `enable_2fa`, `last_login`, `otp_code`, `google_id`, `city`, `is_active`, `is_staff`, `is_superuser`) VALUES
(4, 'Venessa Awuor', '2024-07-08', 'female', 'venessaawuor22@gmail.com', 'Z0FBQUFBQm', 'Z0FBQUFBQm0yRk1Dc0huWDhRQkxjX1hxTE1XWXc1Rjh2MFdnNXl6UWJJOFkycXNJand3bEsyMTdxRlI1R3pUb3B5MGxkUkxlaEF1bVItWWw1SG5FcFl5SDlMZHB2WmhzemRfYWRKbUxydGVuYkhyR1R6aTJqREI2SzdNMUVlNVN2cklCRGFvVGRYUUlEa1l3UG1ZbUU4Z3hETjRaMzkyRUN2MEphX19zNTZrY1l1bHRxRjZrVGZCUHhrWjl5d0R', 'Z0FBQUFBQm0yRk1DdVpuanprMjE0YXpST0tJN0VWRkdPTXpWRU8wVmNXaG1MNFBYYXBxRlRfbFNRM0VOTzRZck02ZmNSQld3RWJ3RDRGMkdYODhKRlhTSTdIY0UxZmtIRi1fMjJOZkJwUFh5MGN4WEFuRUhPV3c2bHFsMG1wZFNITm5ZZ0hQMm4xZkNfbVZVLV9ZczdJT0JnZWtEQmxjdkFpQUg0TXlTTlc5ZzFodmNMaTIzYnd6LWI5NEtCb0c', 'boy', 'Z0FBQUFBQm', 'gilbertketer759@gmail.com', 'sd', 'sdsds', 'dsd', 'sds', 'dsd', 'sdsd', 'dsd', 'dsd', 'sdd', 'sds', '76687', '0759202222', 1, 1, 'pbkdf2_sha256$720000$gARgoLyoPvKe1Nd3RodBCd$xMpdV0z4M1hGVJofKT0tLVsmemJi4Yr5U2GLrPCfH00=', 0, '2024-09-05 03:32:55.475327', '545170', NULL, 'Kenya', 1, 0, 0),
(19, 'GILBERT KIPLANGAT', '2024-09-12', 'Male', 'gilbertketer759@gmail.com', '0759104865', 'Z0FBQUFBQm0yU05zbDBvaWJfcFFXWE1SLVlaX1BmSGYzcjFsOTFwTWtQRXZRQnhzU1FyNkpOaWRCdGhIY2Y1YkY4bnZlcG9qcV9ldzF0bVhBZmtFTElPLV9aa3NrdTNkT0E9PQ==', 'Veness Awuor', 'wife', 'Z0FBQUFBQm', 'venessaawuor22@gmail.com', 'dgfg', 'fgfgfg', 'fgfgf', 'gfgf', 'gfgff', 'fgfg', 'gfgf', 'gfgfgf', 'gfgfg', 'gfgf', '6556', '0704808499', 0, 0, 'pbkdf2_sha256$720000$oeJMYmCFkZHUrgWNcxhaaz$VJUmQ9YLnpNRTWf6naoa+MtOxrdof5dEHHOmZH9eiPo=', 0, '2024-09-05 03:34:02.565172', NULL, NULL, 'Nairobi', 1, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `patients_patient_groups`
--

CREATE TABLE `patients_patient_groups` (
  `id` bigint(20) NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `group_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients_patient_user_permissions`
--

CREATE TABLE `patients_patient_user_permissions` (
  `id` bigint(20) NOT NULL,
  `patient_id` bigint(20) NOT NULL,
  `permission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `timelines_timelines`
--

CREATE TABLE `timelines_timelines` (
  `id` bigint(20) NOT NULL,
  `date` date NOT NULL,
  `time` time(6) NOT NULL,
  `description` longtext NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `patient_email` varchar(100) NOT NULL,
  `long_description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `timelines_timelines`
--

INSERT INTO `timelines_timelines` (`id`, `date`, `time`, `description`, `patient_name`, `patient_email`, `long_description`) VALUES
(34, '2024-10-11', '10:50:00.000000', 'Paracetamol 1 X 2', 'Venessa Awuor', 'venessaawuor22@gmail.com', 'ffdfd'),
(35, '2024-10-11', '10:50:00.000000', 'gilberts tips', 'GILBERT KIPLANGAT', 'gilbertketer759@gmail.com', 'fdfdf');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authentication_user`
--
ALTER TABLE `authentication_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `auth_group`
--
ALTER TABLE `auth_group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  ADD KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`);

--
-- Indexes for table `bookappointments_appointment`
--
ALTER TABLE `bookappointments_appointment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chats_chat`
--
ALTER TABLE `chats_chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chats_chat_user_id_2e106ea9_fk_authentication_user_id` (`user_id`);

--
-- Indexes for table `chats_message`
--
ALTER TABLE `chats_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chats_message_chat_id_f3080004_fk_chats_chat_id` (`chat_id`);

--
-- Indexes for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  ADD KEY `django_admin_log_user_id_c564eba6_fk_authentication_user_id` (`user_id`);

--
-- Indexes for table `django_content_type`
--
ALTER TABLE `django_content_type`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`);

--
-- Indexes for table `django_migrations`
--
ALTER TABLE `django_migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `django_session`
--
ALTER TABLE `django_session`
  ADD PRIMARY KEY (`session_key`),
  ADD KEY `django_session_expire_date_a5c62663` (`expire_date`);

--
-- Indexes for table `doctorsnotes_doctornote`
--
ALTER TABLE `doctorsnotes_doctornote`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medication_medication`
--
ALTER TABLE `medication_medication`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `medication_refillrequest`
--
ALTER TABLE `medication_refillrequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `noticeboard_noticeboard`
--
ALTER TABLE `noticeboard_noticeboard`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `online_doctors_doctors_call`
--
ALTER TABLE `online_doctors_doctors_call`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `peer_id` (`peer_id`);

--
-- Indexes for table `patients_patient`
--
ALTER TABLE `patients_patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `patients_patient_email_d76eb1a9_uniq` (`email`);

--
-- Indexes for table `patients_patient_groups`
--
ALTER TABLE `patients_patient_groups`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `patients_patient_groups_patient_id_group_id_4ccc0471_uniq` (`patient_id`,`group_id`),
  ADD KEY `patients_patient_groups_group_id_8c0323eb_fk_auth_group_id` (`group_id`);

--
-- Indexes for table `patients_patient_user_permissions`
--
ALTER TABLE `patients_patient_user_permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `patients_patient_user_pe_patient_id_permission_id_9edf65dd_uniq` (`patient_id`,`permission_id`),
  ADD KEY `patients_patient_use_permission_id_71b06171_fk_auth_perm` (`permission_id`);

--
-- Indexes for table `timelines_timelines`
--
ALTER TABLE `timelines_timelines`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authentication_user`
--
ALTER TABLE `authentication_user`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `auth_group`
--
ALTER TABLE `auth_group`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `auth_permission`
--
ALTER TABLE `auth_permission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT for table `bookappointments_appointment`
--
ALTER TABLE `bookappointments_appointment`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `chats_chat`
--
ALTER TABLE `chats_chat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `chats_message`
--
ALTER TABLE `chats_message`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `django_content_type`
--
ALTER TABLE `django_content_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `django_migrations`
--
ALTER TABLE `django_migrations`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `doctorsnotes_doctornote`
--
ALTER TABLE `doctorsnotes_doctornote`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medication_medication`
--
ALTER TABLE `medication_medication`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `medication_refillrequest`
--
ALTER TABLE `medication_refillrequest`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `noticeboard_noticeboard`
--
ALTER TABLE `noticeboard_noticeboard`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `online_doctors_doctors_call`
--
ALTER TABLE `online_doctors_doctors_call`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `patients_patient`
--
ALTER TABLE `patients_patient`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `patients_patient_groups`
--
ALTER TABLE `patients_patient_groups`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patients_patient_user_permissions`
--
ALTER TABLE `patients_patient_user_permissions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `timelines_timelines`
--
ALTER TABLE `timelines_timelines`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `auth_group_permissions`
--
ALTER TABLE `auth_group_permissions`
  ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `auth_permission`
--
ALTER TABLE `auth_permission`
  ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`);

--
-- Constraints for table `chats_chat`
--
ALTER TABLE `chats_chat`
  ADD CONSTRAINT `chats_chat_user_id_2e106ea9_fk_authentication_user_id` FOREIGN KEY (`user_id`) REFERENCES `authentication_user` (`id`);

--
-- Constraints for table `chats_message`
--
ALTER TABLE `chats_message`
  ADD CONSTRAINT `chats_message_chat_id_f3080004_fk_chats_chat_id` FOREIGN KEY (`chat_id`) REFERENCES `chats_chat` (`id`);

--
-- Constraints for table `django_admin_log`
--
ALTER TABLE `django_admin_log`
  ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_authentication_user_id` FOREIGN KEY (`user_id`) REFERENCES `authentication_user` (`id`);

--
-- Constraints for table `patients_patient_groups`
--
ALTER TABLE `patients_patient_groups`
  ADD CONSTRAINT `patients_patient_gro_patient_id_194a78e4_fk_patients_` FOREIGN KEY (`patient_id`) REFERENCES `patients_patient` (`id`),
  ADD CONSTRAINT `patients_patient_groups_group_id_8c0323eb_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`);

--
-- Constraints for table `patients_patient_user_permissions`
--
ALTER TABLE `patients_patient_user_permissions`
  ADD CONSTRAINT `patients_patient_use_patient_id_b1371243_fk_patients_` FOREIGN KEY (`patient_id`) REFERENCES `patients_patient` (`id`),
  ADD CONSTRAINT `patients_patient_use_permission_id_71b06171_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
