-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2024 at 07:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flow`
--

-- --------------------------------------------------------

--
-- Table structure for table `personal_tasks`
--

CREATE TABLE `personal_tasks` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `subtasks` text DEFAULT NULL,
  `priority` enum('High','Medium','Low') DEFAULT 'High',
  `dueDate` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `personal_tasks`
--

INSERT INTO `personal_tasks` (`id`, `username`, `title`, `description`, `subtasks`, `priority`, `dueDate`, `created_at`, `updated_at`) VALUES
(3, 'Gopal', 'dfgfdg', 'dfgdfd', '[{\"title\":\"fdshfdh\",\"status\":\"Completed\"},{\"title\":\"sdfhdf\",\"status\":\"Completed\"},{\"title\":\"sdfhdf\",\"status\":\"Completed\"},{\"title\":\"sdfhdf\",\"status\":\"Completed\"}]', 'High', '2024-04-24', '2024-04-24 01:46:03', '2024-04-24 05:34:23'),
(4, 'Gopal', 'hyt', 'hfghrtd', '[{\"title\":\"trrtrtu\",\"status\":\"In Progress\"}]', 'Medium', '2024-04-24', '2024-04-24 01:47:41', '2024-04-24 02:26:41'),
(5, 'Gopal', 'sggh', 'ghfdgffghf', '[{\"title\":\"hfjghjgfhgj\",\"status\":\"Completed\"}]', 'Medium', '2024-04-24', '2024-04-24 02:30:22', '2024-04-24 02:30:22'),
(6, 'Gopal', 'hjdfbjds', 'shdfbjdsh', '[{\"title\":\"sdhfjdsh\",\"status\":\"Not Started\"}]', 'High', '1122-02-21', '2024-04-24 05:36:26', '2024-04-24 05:36:26'),
(7, 'Pranjal', 'Yuvraj ', 'hdfjsdhfskfdkh', '[{\"title\":\"Yuvraj la mara\",\"status\":\"Completed\"}]', 'High', '2024-10-05', '2024-10-05 17:23:53', '2024-10-05 17:24:29');

-- --------------------------------------------------------

--
-- Table structure for table `team_tasks`
--

CREATE TABLE `team_tasks` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `subtasks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`subtasks`)),
  `priority` enum('High','Medium','Low') NOT NULL,
  `dueDate` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team_tasks`
--

INSERT INTO `team_tasks` (`id`, `username`, `title`, `description`, `subtasks`, `priority`, `dueDate`, `created_at`) VALUES
(1, 'Gopal', 'hsdfhj', 'jhsdbfjhdsfvb', '[{\"title\":\"sddhbfhjd\",\"status\":\"In Progress\",\"teamMemberId\":\"Gopal\"},{\"title\":\"hfjwdh\",\"status\":\"Not Started\",\"teamMemberId\":\"Pranjal\"}]', 'High', '6263-03-04', '2024-04-24 07:33:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL,
  `facebook_link` varchar(255) DEFAULT NULL,
  `linkedin_link` varchar(255) DEFAULT NULL,
  `instagram_link` varchar(255) DEFAULT NULL,
  `github_link` varchar(255) DEFAULT NULL,
  `skills` text DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `profile_complete` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `mobile_no`, `profile_photo`, `name`, `dob`, `gender`, `facebook_link`, `linkedin_link`, `instagram_link`, `github_link`, `skills`, `password`, `profile_complete`) VALUES
(1, 'Gopal', 'gopaldose12345@gmail.com', '8605961162', 'Gopal.jpg', 'Gopal Vijay Dose', '2024-04-24', 'male', 'https://www.linkedin.com/in/gopaldose21/', 'https://www.linkedin.com/in/gopaldose21/', 'https://www.linkedin.com/in/gopaldose21/', 'https://www.linkedin.com/in/gopaldose21/', 'html, fd,fdfdfd,fdgdfg,fdgdf,df', '12345', 1),
(2, 'Pranjal', 'pranjalsapkaledgk@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '1234567890', 0),
(3, 'nikita', 'nikita@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123456', 0),
(4, 'Gopal Dose', 'gopal123456789@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '123456789', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `personal_tasks`
--
ALTER TABLE `personal_tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team_tasks`
--
ALTER TABLE `team_tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `personal_tasks`
--
ALTER TABLE `personal_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `team_tasks`
--
ALTER TABLE `team_tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
