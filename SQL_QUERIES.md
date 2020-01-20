Get assessments by limited students, Join with students and courses, Create average score column, and parse courses to JSON

```SQL
SELECT assessments.*, students.name AS student_name, courses.name AS course_name,
  (
    SELECT avg(score)
    FROM   assessments ass
    WHERE assessments.student_id=ass.student_id
	) AS individual_avg_score,
	CONCAT (
		'[',
		GROUP_CONCAT(
			CONCAT(
				'{',
				'"id":', courses.id, ',',
				'"name":"', courses.name, '",',
				'"score":', assessments.score,
				'}'
			)
		),
		']'
	) as courses
FROM assessments
JOIN students
	ON  (assessments.student_id = students.id)
JOIN courses
	ON  (assessments.course_id = courses.id)
WHERE assessments.student_id IN (
	SELECT student_id
	FROM  (
   		SELECT student_id
   		FROM   assessments
   		group by student_id
   		LIMIT 10 OFFSET 0
	) AS studentIds
)
GROUP BY student_id;
```

Get assessments by limited students, Join with students and courses

```SQL
select assessments.* , students.name as student_name, courses.name as course_name
from assessments
JOIN students
	ON  (assessments.student_id = students.id)
JOIN courses
	ON  (assessments.course_id = courses.id)
where assessments.student_id IN (
	SELECT student_id
	FROM  (
   		SELECT student_id
   		FROM   assessments
   		group by student_id
   		LIMIT 10 OFFSET 0
	) AS studentIds
)
```
