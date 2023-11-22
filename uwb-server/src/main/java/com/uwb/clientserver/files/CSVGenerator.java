package com.uwb.clientserver.files;

import com.opencsv.CSVWriter;
import lombok.extern.slf4j.Slf4j;

import java.io.ByteArrayOutputStream;
import java.io.OutputStreamWriter;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
public class CSVGenerator {

    /**

     Generates a CSV file based on a list of column definitions and data.*
     @param columnDefinitions List of CSV column definitions.
     @param data              List of data for which the CSV file will be
     generated.
     @param <T>               Data type for column definitions and data.
     @return The CSV file as a byte array.
     @throws java.io.IOException
     */
    public static <T> byte[] generateCSV(List<CSVColumnnDefinition<T>> columnDefinitions, List<T> data) {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        CSVWriter csvWriter = new CSVWriter(new OutputStreamWriter(outputStream, StandardCharsets.UTF_8));

        String[] header = columnDefinitions.stream()
                .map(CSVColumnnDefinition::getColumnHeader)
                .toArray(String[]::new);
        csvWriter.writeNext(header);

        for (T obj : data) {
            String[] rowData = columnDefinitions.stream()
                    .map(columnDef -> columnDef.getFieldGetterExpression().apply(obj))
                    .toArray(String[]::new);
            csvWriter.writeNext(rowData);
        }

        try {
            csvWriter.close();
        } catch (java.io.IOException e) {
            log.error(e.getMessage(), e);

        }
        return outputStream.toByteArray();
    }
}
