def final_grade(exem, hw):
    """return final grade of an final grade
    input is exam and hw """

    hw1 = x
    hw2 = y
    hw3 = z

    if (exem > 60) and ((x + y + z // 3) <= (exem + 30)):
        final_grade = (0.8 * exem) and (0.2 * hw)
    else:
        final_grade = (0.8 * exem)

    return final_grade

if __name__ == '__main__':
    x, y, z = input("Enter three SB scores seperated by a comma: ")
    exam = input("Enter Exam score: ")
    print(final_grade(exam, (x, y, z)))
